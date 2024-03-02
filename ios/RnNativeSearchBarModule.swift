import ExpoModulesCore

public class RnNativeSearchBarModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('RnNativeSearchBar')` in JavaScript.
    Name("RnNativeSearchBar")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    Constants([
      "PI": Double.pi
    ])

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      return "Hello world! 👋"
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { (value: String) in
      // Send an event to JavaScript.
      self.sendEvent("onChange", [
        "value": value
      ])
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of the
    // view definition: Prop, Events.
    View(RnNativeSearchBarView.self) {
      Events("onSearchTextChanged", "onSearchButtonClicked", "onSearchTextEditEndedEvent")
        
      // Defines a setter for the `name` prop.
      Prop("name") { (view: RnNativeSearchBarView, prop: String) in
        print(prop)
      }
        
      Prop("text") { (view: RnNativeSearchBarView, prop: String) in
        view.searchViewController.searchController.searchBar.text = prop
      }
        
      Prop("placeholder") { (view: RnNativeSearchBarView, prop: String) in
        view.searchViewController.searchController.searchBar.placeholder = prop
      }
        
      Prop("textColor") { (view: RnNativeSearchBarView, color: UIColor) in
          view.searchViewController.searchController.searchBar.tintColor = color
      }
        
      Prop("appearance") { (view: RnNativeSearchBarView, prop: String) in
          if(prop == "dark") {
              view.searchViewController.searchController.searchBar.keyboardAppearance = .dark
          } else if(prop == "light") {
              view.searchViewController.searchController.searchBar.keyboardAppearance = .light
          } else {
              view.searchViewController.searchController.searchBar.keyboardAppearance = .default
          }
      }
        
      Prop("searchHints") { (view: RnNativeSearchBarView, hints: [String]) in
          if #available(tvOS 14.0, *) {
              let searchHints = hints.map { h in
                  self.createSearchHint(h)
              }
              view.searchViewController.searchController.searchSuggestions = searchHints
          } else {
              // No Search Hints available
          }
      }
        
      AsyncFunction("focus") { (view: RnNativeSearchBarView) in
          view.becomeFirstResponder()
      }
        
      AsyncFunction("blur") { (view: RnNativeSearchBarView) in
          view.resignFirstResponder()
      }
        
      AsyncFunction("clearText") { (viewTag: Int, promise: Promise) in
          guard let view = self.appContext?.findView(withTag: viewTag, ofType: RnNativeSearchBarView.self) else {
            throw Exceptions.ViewNotFound((tag: viewTag, type: RnNativeSearchBarView.self))
          }
          view.clearText()
      }
      .runOnQueue(.main)
    }
  }
    
  @available(tvOS 14.0, *)
  func createSearchHint(_ hint: String) -> UISearchSuggestion {
      return UISearchSuggestionItem(localizedSuggestion: hint)
  }
}

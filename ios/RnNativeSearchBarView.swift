import ExpoModulesCore

// This view will be used as a native component. Make sure to inherit from `ExpoView`
// to apply the proper styling (e.g. border radius and shadows).
class RnNativeSearchBarView: ExpoView, UISearchBarDelegate {
    
    var searchViewController : UISearchContainerViewController
    let onChangeText = EventDispatcher()
    
    required init(appContext: AppContext? = nil) {
        let searchController = UISearchController(searchResultsController: UIViewController())
        searchViewController = UISearchContainerViewController(searchController: searchController)
        super.init(appContext: appContext)
        searchController.searchBar.delegate = self
        self.backgroundColor = .blue
        
        clipsToBounds = true
        
        searchViewController.view.frame = self.frame
        searchViewController.view.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        addSubview(searchViewController.view)
        searchViewController.didMove(toParent: reactViewController())
    }
    
    override func layoutSubviews() {
        searchViewController.view.frame = bounds
    }
    
    func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
        print("Textchange: ", searchText)
        self.onChangeText((["text": searchText]))
    }
    
    func clearText() {
        searchViewController.searchController.searchBar.text = ""
    }
    
}

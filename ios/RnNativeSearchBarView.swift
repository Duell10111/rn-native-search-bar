import ExpoModulesCore

// This view will be used as a native component. Make sure to inherit from `ExpoView`
// to apply the proper styling (e.g. border radius and shadows).
class RnNativeSearchBarView: ExpoView, UISearchBarDelegate {
    
    var searchViewController : UISearchContainerViewController
    let onSearchTextChanged = EventDispatcher()
    let onSearchButtonClicked = EventDispatcher()
    
    required init(appContext: AppContext? = nil) {
        let searchController = UISearchController(searchResultsController: UIViewController())
        searchViewController = UISearchContainerViewController(searchController: searchController)
        super.init(appContext: appContext)
        searchController.searchBar.delegate = self
        
        clipsToBounds = true
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        searchViewController.view.frame = bounds
        addViewControllerAsSubView()
    }
    
    override func removeFromSuperview() {
        searchViewController.willMove(toParent: nil)
        searchViewController.view.removeFromSuperview()
        searchViewController.removeFromParent()
        super.removeFromSuperview()
    }
    
    private func addViewControllerAsSubView() {
        
        searchViewController.view.frame = self.frame
        searchViewController.view.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        // To only add as subview once to prevent click issue
        if subviews.isEmpty {
            self.addSubview(searchViewController.view)
        } else {
            print("Subviews not empty!")
        }
        
        guard let vc = reactViewController() else { print("VC null!"); return }
        
        searchViewController.didMove(toParent: reactViewController())
        vc.addChild(searchViewController)
    }
    
    func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
        print("Textchange: ", searchText)
        self.onSearchTextChanged((["text": searchText]))
    }
    
    func searchBarSearchButtonClicked(_ searchBar: UISearchBar) {
        self.onSearchButtonClicked((["text": searchBar.text ?? ""]))
    }
    
    func clearText() {
        searchViewController.searchController.searchBar.text = ""
    }
    
}

extension UIView {
    var parentViewController: UIViewController? {
        var parentResponder: UIResponder? = self
        while parentResponder != nil {
            parentResponder = parentResponder!.next
            if let viewController = parentResponder as? UIViewController {
                return viewController
            }
        }
        return nil
    }
}

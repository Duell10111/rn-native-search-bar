import ExpoModulesCore

// This view will be used as a native component. Make sure to inherit from `ExpoView`
// to apply the proper styling (e.g. border radius and shadows).
class RnNativeSearchBarView: ExpoView, UISearchBarDelegate {
    
    var searchResultController = UIViewController()
    var searchViewController : UISearchContainerViewController
    let onSearchTextChanged = EventDispatcher()
    let onSearchButtonClicked = EventDispatcher()
    let onSearchTextEditEndedEvent = EventDispatcher()
    
    required init(appContext: AppContext? = nil) {
        let searchController = UISearchController(searchResultsController: searchResultController)
        searchViewController = UISearchContainerViewController(searchController: searchController)
        super.init(appContext: appContext)
        searchController.searchBar.delegate = self
#if os(iOS)
        // On iOS UIKit keeps the results controller hidden unless asked to show it,
        // which would hide the React children. tvOS always shows it.
        searchController.showsSearchResultsController = true
#endif
        
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
    
    override func becomeFirstResponder() -> Bool {
        super.becomeFirstResponder()
        return searchViewController.searchController.searchBar.becomeFirstResponder()
    }
    
    override func resignFirstResponder() -> Bool {
        super.resignFirstResponder()
        return searchViewController.searchController.searchBar.resignFirstResponder()
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
        
        guard let vc = parentViewController else { print("VC null!"); return }
        
        searchViewController.didMove(toParent: vc)
        vc.addChild(searchViewController)
    }
    
    func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
        print("Textchange: ", searchText)
        self.onSearchTextChanged((["text": searchText]))
    }
    
    func searchBarSearchButtonClicked(_ searchBar: UISearchBar) {
        self.onSearchButtonClicked((["text": searchBar.text ?? ""]))
    }
    
    func searchBarTextDidEndEditing(_ searchBar: UISearchBar) {
        self.onSearchTextEditEndedEvent(["text": searchBar.text ?? ""])
    }
    
    func clearText() {
        searchViewController.searchController.searchBar.text = ""
    }
    
    // MARK: - Child views (rendered inside the search results controller)

    func mountSearchResultView(_ childView: UIView) {
        searchResultController.view.addSubview(childView)
    }

    func unmountSearchResultView(_ childView: UIView) {
        childView.removeFromSuperview()
        searchViewController.view?.subviews.forEach({ v in
            v.removeFromSuperview()
        })
    }

    // The legacy architecture counterparts live in RnNativeSearchBarView+OldArch.swift.
    // TODO(old-arch): Remove the surrounding #if once the legacy architecture is dropped.
#if RCT_NEW_ARCH_ENABLED
    override func mountChildComponentView(_ childComponentView: UIView, index: Int) {
        mountSearchResultView(childComponentView)
    }

    override func unmountChildComponentView(_ childComponentView: UIView, index: Int) {
        unmountSearchResultView(childComponentView)
    }
#endif

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

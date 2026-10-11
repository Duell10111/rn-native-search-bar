// Legacy (Paper) architecture support.
// TODO(old-arch): Delete this file together with the `#if RCT_NEW_ARCH_ENABLED` in
// RnNativeSearchBarView.swift and the OTHER_SWIFT_FLAGS in RnNativeSearchBar.podspec
// once the legacy architecture is no longer supported.
#if !RCT_NEW_ARCH_ENABLED
import ExpoModulesCore

extension RnNativeSearchBarView {
    override func insertReactSubview(_ subview: UIView!, at atIndex: Int) {
        mountSearchResultView(subview)
    }

    override func removeReactSubview(_ subview: UIView!) {
        unmountSearchResultView(subview)
    }
}
#endif

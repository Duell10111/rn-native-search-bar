import { requireNativeViewManager } from "expo-modules-core";
import * as React from "react";

import type {
  RnNativeSearchBarViewProps,
  RnNativeSearchBarViewRef,
} from "./RnNativeSearchBar.types";

const NativeView: React.ComponentType<
  RnNativeSearchBarViewProps & React.RefAttributes<RnNativeSearchBarViewRef>
> = requireNativeViewManager("RnNativeSearchBar");

const RnNativeSearchBarView = React.forwardRef<
  RnNativeSearchBarViewRef,
  RnNativeSearchBarViewProps
>((props, ref) => <NativeView {...props} ref={ref} />);
RnNativeSearchBarView.displayName = "RnNativeSearchBarView";

export default RnNativeSearchBarView;

import { NativeModule, requireNativeModule } from "expo-modules-core";

import type { RnNativeSearchBarModuleEvents } from "./RnNativeSearchBar.types";

declare class RnNativeSearchBarModule extends NativeModule<RnNativeSearchBarModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// It loads the native module object from the JSI.
export default requireNativeModule<RnNativeSearchBarModule>(
  "RnNativeSearchBar",
);

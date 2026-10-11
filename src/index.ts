import type { EventSubscription } from "expo-modules-core";

import type { ChangeEventPayload } from "./RnNativeSearchBar.types";
// Import the native module. On web, it will be resolved to RnNativeSearchBar.web.ts
// and on native platforms to RnNativeSearchBar.ts
import RnNativeSearchBarModule from "./RnNativeSearchBarModule";
import RnNativeSearchBarView from "./RnNativeSearchBarView";

// Get the native constant value.
export const PI = RnNativeSearchBarModule.PI;

export function hello(): string {
  return RnNativeSearchBarModule.hello();
}

export async function setValueAsync(value: string) {
  return await RnNativeSearchBarModule.setValueAsync(value);
}

export function addChangeListener(
  listener: (event: ChangeEventPayload) => void,
): EventSubscription {
  return RnNativeSearchBarModule.addListener("onChange", listener);
}

export { RnNativeSearchBarView };
export type * from "./RnNativeSearchBar.types";

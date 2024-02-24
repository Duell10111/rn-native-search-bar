import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to RnNativeSearchBar.web.ts
// and on native platforms to RnNativeSearchBar.ts
import RnNativeSearchBarModule from './RnNativeSearchBarModule';
import RnNativeSearchBarView from './RnNativeSearchBarView';
import { ChangeEventPayload, RnNativeSearchBarViewProps } from './RnNativeSearchBar.types';

// Get the native constant value.
export const PI = RnNativeSearchBarModule.PI;

export function hello(): string {
  return RnNativeSearchBarModule.hello();
}

export async function setValueAsync(value: string) {
  return await RnNativeSearchBarModule.setValueAsync(value);
}

const emitter = new EventEmitter(RnNativeSearchBarModule ?? NativeModulesProxy.RnNativeSearchBar);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { RnNativeSearchBarView, RnNativeSearchBarViewProps, ChangeEventPayload };

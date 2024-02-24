import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { RnNativeSearchBarViewProps } from './RnNativeSearchBar.types';

const NativeView: React.ComponentType<RnNativeSearchBarViewProps> =
  requireNativeViewManager('RnNativeSearchBar');

export default function RnNativeSearchBarView(props: RnNativeSearchBarViewProps) {
  return <NativeView {...props} />;
}

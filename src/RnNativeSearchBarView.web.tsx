import * as React from 'react';

import { RnNativeSearchBarViewProps } from './RnNativeSearchBar.types';

export default function RnNativeSearchBarView(props: RnNativeSearchBarViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}

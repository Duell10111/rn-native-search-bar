import type React from "react";
import type { StyleProp, ViewStyle } from "react-native";

export type ChangeEventPayload = {
  value: string;
};

export type RnNativeSearchBarModuleEvents = {
  onChange: (event: ChangeEventPayload) => void;
};

export type OnSearchTextChangedEvent = {
  text: string;
};

export type OnSearchButtonClickedEvent = {
  text: string;
};

export type OnSearchTextEditEndedEvent = {
  text: string;
};

export type RnNativeSearchBarViewProps = {
  // TODO: Remove?
  name?: string;
  placeholder?: string;
  text?: string;
  textColor?: string;
  appearance?: "dark" | "light";
  style?: StyleProp<ViewStyle>;
  onSearchTextChanged?: (event: {
    nativeEvent: OnSearchTextChangedEvent;
  }) => void;
  onSearchButtonClicked?: (event: {
    nativeEvent: OnSearchButtonClickedEvent;
  }) => void;
  onSearchTextEditEndedEvent?: (event: {
    nativeEvent: OnSearchTextEditEndedEvent;
  }) => void;
  searchHints?: string[];
  /** Rendered inside the search results controller. */
  children?: React.ReactNode;
};

/** Imperative methods available through a `ref` on `RnNativeSearchBarView`. */
export type RnNativeSearchBarViewRef = {
  focus: () => Promise<void>;
  blur: () => Promise<void>;
  clearText: () => Promise<void>;
};

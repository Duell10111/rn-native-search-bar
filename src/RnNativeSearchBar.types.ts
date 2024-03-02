import { StyleProp, ViewStyle } from "react-native";
import React from "react";

export type ChangeEventPayload = {
  value: string;
};

export type OnSearchTextChangedEvent = {
  text: string;
};

export type OnSearchButtonClickedEvent = {
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
  onSearchTextChanged?: (event: { nativeEvent: OnSearchTextChangedEvent }) => void;
  onSearchButtonClicked?: (event: { nativeEvent: OnSearchButtonClickedEvent }) => void;
  onSearchTextEditEndedEvent?: () => void;
  children: React.ReactNode;
};

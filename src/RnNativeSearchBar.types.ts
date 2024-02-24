import { StyleProp, ViewStyle } from "react-native";

export type ChangeEventPayload = {
  value: string;
};

export type OnSearchTextChangedEvent = {
  text: string;
};

export type RnNativeSearchBarViewProps = {
  // TODO: Remove?
  name?: string;
  placeholder?: string;
  text?: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
  onSearchTextChanged?: (event: { nativeEvent: OnSearchTextChangedEvent }) => void;
};

import { StyleProp, ViewStyle } from "react-native";

export type ChangeEventPayload = {
  value: string;
};

export type OnChangeTextEvent = {
  text: string;
};

export type RnNativeSearchBarViewProps = {
  // TODO: Remove?
  name?: string;
  placeholder?: string;
  text?: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
  onChangeText?: (event: { nativeEvent: OnChangeTextEvent }) => void;
};

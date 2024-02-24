export type ChangeEventPayload = {
  value: string;
};

export type OnChangeTextEvent = {
  text: string;
};

export type RnNativeSearchBarViewProps = {
  name: string;
  placeholder?: string;
  text?: string;
  textColor?: string;
  // TODO: Add react-native as dev dependency?
  // style?: StyleProp<View>
  onChangeText?: (event: {nativeEvent: OnChangeTextEvent}) => void;
};

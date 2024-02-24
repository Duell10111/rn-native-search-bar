import { StyleSheet, Text, View } from 'react-native';

import * as RnNativeSearchBar from 'rn-native-search-bar';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{RnNativeSearchBar.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

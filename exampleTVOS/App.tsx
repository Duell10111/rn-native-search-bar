import { StyleSheet, Text, View } from "react-native";
import * as RnNativeSearchBar from "rn-native-search-bar";

export default function App() {
  console.log("APP test");
  return (
    <View style={styles.container}>
      <Text>{RnNativeSearchBar.hello()}</Text>
      <RnNativeSearchBar.RnNativeSearchBarView
        placeholder="Placeholder"
        text="TEXT"
        textColor="#ff0000"
        style={styles.searchView}
        onSearchTextChanged={(event) => console.log(event.nativeEvent.text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  searchView: {
    width: 1920,
    height: 1000,
    backgroundColor: "blue",
  },
});

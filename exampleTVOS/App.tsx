import { StyleSheet, Text, View } from "react-native";
import * as RnNativeSearchBar from "rn-native-search-bar";
import { useEffect, useState } from "react";

export default function App() {
  const [hints, setHints] = useState<string[]>([])
  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    const hints = Array.from({length: 40}, () => Math.floor(Math.random() * 40)).map(v => "hint" + v);
    setHints(hints)
  }, [searchText]);

  return (
    <View style={styles.container}>
      <Text>{RnNativeSearchBar.hello()}</Text>
      <RnNativeSearchBar.RnNativeSearchBarView
        placeholder="Placeholder"
        text="TEXT"
        textColor="#ff0000"
        style={styles.searchView}
        onSearchTextChanged={(event) => setSearchText(event.nativeEvent.text)}
        onSearchButtonClicked={(event) => console.log(event.nativeEvent.text)}
        onSearchTextEditEndedEvent={() => console.log("Text Edit ended!")}
        searchHints={hints}
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

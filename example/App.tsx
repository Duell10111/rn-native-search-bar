import { useMemo, useRef, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as RnNativeSearchBar from 'rn-native-search-bar';
import type { RnNativeSearchBarViewRef } from 'rn-native-search-bar';

const ITEMS = ['Apple', 'Banana', 'Cherry', 'Grape', 'Lemon', 'Mango', 'Orange', 'Peach'];

export default function App() {
  const searchBar = useRef<RnNativeSearchBarViewRef>(null);
  const [searchText, setSearchText] = useState('');
  const [submittedText, setSubmittedText] = useState('');
  const [editEndedText, setEditEndedText] = useState('');

  const results = useMemo(
    () => ITEMS.filter((item) => item.toLowerCase().includes(searchText.toLowerCase())),
    [searchText]
  );

  return (
    <View style={styles.container}>
      <Text testID="hello">{RnNativeSearchBar.hello()}</Text>
      <Text testID="search-text">Text: {searchText}</Text>
      <Text testID="submitted-text">Submitted: {submittedText}</Text>
      <Text testID="edit-ended-text">Edit ended: {editEndedText}</Text>
      <View style={styles.buttons}>
        <Button testID="focus-button" title="Focus" onPress={() => searchBar.current?.focus()} />
        <Button testID="blur-button" title="Blur" onPress={() => searchBar.current?.blur()} />
        <Button
          testID="clear-button"
          title="Clear"
          onPress={() => searchBar.current?.clearText()}
        />
      </View>
      <RnNativeSearchBar.RnNativeSearchBarView
        ref={searchBar}
        placeholder="Search fruits"
        textColor="#ff0000"
        searchHints={results.slice(0, 3)}
        style={styles.searchView}
        onSearchTextChanged={(event) => setSearchText(event.nativeEvent.text)}
        onSearchButtonClicked={(event) => setSubmittedText(event.nativeEvent.text)}
        onSearchTextEditEndedEvent={(event) => setEditEndedText(event.nativeEvent.text)}>
        <ScrollView testID="search-results" style={styles.results}>
          {results.map((item) => (
            <Text key={item} testID={`result-${item}`} style={styles.result}>
              {item}
            </Text>
          ))}
        </ScrollView>
      </RnNativeSearchBar.RnNativeSearchBarView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  searchView: {
    flex: 1,
  },
  results: {
    flex: 1,
    paddingTop: 120,
  },
  result: {
    fontSize: 18,
    padding: 8,
  },
});

import { useMemo, useRef, useState } from 'react';
import { Button, Modal, StyleSheet, Text, View } from 'react-native';
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
    <Modal>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text testID="hello">{RnNativeSearchBar.hello()}</Text>
          <Text testID="search-text">Text: {searchText}</Text>
          <Text testID="submitted-text">Submitted: {submittedText}</Text>
          <Text testID="edit-ended-text">Edit ended: {editEndedText}</Text>
          <Button testID="clear-button" title="Clear" onPress={() => searchBar.current?.clearText()} />
        </View>
        <RnNativeSearchBar.RnNativeSearchBarView
          ref={searchBar}
          placeholder="Search fruits"
          textColor="#ff0000"
          appearance="dark"
          searchHints={results.slice(0, 3)}
          style={styles.searchView}
          onSearchTextChanged={(event) => setSearchText(event.nativeEvent.text)}
          onSearchButtonClicked={(event) => setSubmittedText(event.nativeEvent.text)}
          onSearchTextEditEndedEvent={(event) => setEditEndedText(event.nativeEvent.text)}>
          <View testID="search-results" style={styles.results}>
            {results.map((item) => (
              <Text key={item} testID={`result-${item}`} style={styles.result}>
                {item}
              </Text>
            ))}
          </View>
        </RnNativeSearchBar.RnNativeSearchBarView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 24,
  },
  searchView: {
    flex: 1,
  },
  results: {
    flex: 1,
    paddingTop: 400,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  result: {
    fontSize: 32,
    padding: 24,
  },
});

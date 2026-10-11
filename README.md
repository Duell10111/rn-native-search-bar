# rn-native-search-bar

A native search bar for React Native on **iOS** and **tvOS**, built as an [Expo module](https://docs.expo.dev/modules/overview/).

The component wraps UIKit's `UISearchController` inside a `UISearchContainerViewController`. On tvOS this gives you the system search experience including the on-screen keyboard; on iOS you get a native `UISearchBar`. React children are rendered inside the search results controller, so your result list sits right below the native search UI.

| Platform | Status |
| --- | --- |
| iOS (15.1+) | ✅ Supported |
| tvOS (15.1+, via [react-native-tvos](https://github.com/react-native-tvos/react-native-tvos)) | ✅ Supported |
| Android | 🚧 Not implemented (renders an empty view) |
| Web | ❌ Not supported |

Both the New Architecture (Fabric) and the legacy architecture (Paper) are supported.

## Installation

The library requires the `expo` package. In a bare React Native project, [install and configure Expo modules](https://docs.expo.dev/bare/installing-expo-modules/) first.

```sh
npm install rn-native-search-bar
# or the latest prerelease
npm install rn-native-search-bar@beta
```

Then install the pods:

```sh
npx pod-install
```

In an Expo project using [Continuous Native Generation](https://docs.expo.dev/workflow/continuous-native-generation/), run `npx expo prebuild` instead. The module contains native code, so it does **not** work in Expo Go – use a [development build](https://docs.expo.dev/develop/development-builds/introduction/).

## Usage

```tsx
import { useMemo, useRef, useState } from "react";
import { ScrollView, Text } from "react-native";
import {
  RnNativeSearchBarView,
  type RnNativeSearchBarViewRef,
} from "rn-native-search-bar";

const ITEMS = ["Apple", "Banana", "Cherry", "Grape", "Lemon", "Mango"];

export default function SearchScreen() {
  const searchBar = useRef<RnNativeSearchBarViewRef>(null);
  const [query, setQuery] = useState("");

  const results = useMemo(
    () => ITEMS.filter((item) => item.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <RnNativeSearchBarView
      ref={searchBar}
      style={{ flex: 1 }}
      placeholder="Search fruits"
      searchHints={results.slice(0, 3)}
      onSearchTextChanged={(e) => setQuery(e.nativeEvent.text)}
      onSearchButtonClicked={(e) => console.log("Submitted:", e.nativeEvent.text)}
    >
      {/* Rendered inside the native search results controller */}
      <ScrollView style={{ flex: 1, paddingTop: 120 }}>
        {results.map((item) => (
          <Text key={item}>{item}</Text>
        ))}
      </ScrollView>
    </RnNativeSearchBarView>
  );
}
```

> **Note:** The search UI occupies the top of the view, so give your children enough top padding (the examples use `120` on iOS and `400` on tvOS). On tvOS the component works best inside a full-screen view or `Modal`.

See [`example/App.tsx`](example/App.tsx) (iOS) and [`exampleTVOS/App.tsx`](exampleTVOS/App.tsx) (tvOS) for complete examples.

## API

### `<RnNativeSearchBarView />`

#### Props

| Prop | Type | Description |
| --- | --- | --- |
| `placeholder` | `string` | Placeholder shown in the empty search field. |
| `text` | `string` | Sets the text of the search field. |
| `textColor` | `string` | Tint color of the search bar (cursor, accents). |
| `appearance` | `"dark" \| "light"` | Keyboard appearance. Defaults to the system appearance. |
| `searchHints` | `string[]` | Search suggestions shown by the system. Requires iOS 16+ / tvOS 14+; ignored on older versions. |
| `style` | `StyleProp<ViewStyle>` | Style of the container view. Usually `{ flex: 1 }`. |
| `children` | `ReactNode` | Content rendered inside the search results controller. |

#### Events

All events receive `{ nativeEvent: { text: string } }`.

| Event | Fired when |
| --- | --- |
| `onSearchTextChanged` | The text in the search field changes. |
| `onSearchButtonClicked` | The user presses the search/return button. |
| `onSearchTextEditEndedEvent` | Editing ends (the search field loses focus). |

#### Ref methods (`RnNativeSearchBarViewRef`)

| Method | Description |
| --- | --- |
| `focus(): Promise<void>` | Focuses the search field and opens the keyboard. |
| `blur(): Promise<void>` | Removes focus from the search field. |
| `clearText(): Promise<void>` | Clears the search field. |

## Architecture support

The iOS/tvOS view supports both the New Architecture (Fabric) and the legacy architecture (Paper).
Legacy support is isolated so it can be dropped easily – search for `TODO(old-arch)`:

- `ios/RnNativeSearchBarView+OldArch.swift` – delete the file
- `ios/RnNativeSearchBarView.swift` – remove the `#if RCT_NEW_ARCH_ENABLED` / `#endif` around the Fabric overrides
- `ios/RnNativeSearchBar.podspec` – remove `new_arch_enabled` and the `OTHER_SWIFT_FLAGS` entry

## Development

| Command | Description |
| --- | --- |
| `yarn test` | Jest unit tests for the JS API (`src/__tests__`) |
| `yarn lint` / `yarn typecheck` | ESLint and TypeScript checks |
| `cd example && npm run prebuild && npm run ios` | iOS example app (Expo SDK 57) |
| `cd exampleTVOS && yarn prebuild && yarn ios` | tvOS example app (react-native-tvos) |
| `cd example && npm run e2e` | Maestro end-to-end tests (`e2e/`) against the installed iOS example app |

The native `ios`/`android` folders of the example apps are generated by `expo prebuild` and are not checked in.

### Releases

Releases are published automatically to npm by [semantic-release](https://github.com/semantic-release/semantic-release) based on [Conventional Commits](https://www.conventionalcommits.org/). Pushes to `main` create stable releases, pushes to `beta` / `alpha` create prereleases. Use the `breaking:` commit type for a major release.

## License

MIT

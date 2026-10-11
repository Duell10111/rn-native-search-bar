import { act, fireEvent, render, screen } from "@testing-library/react-native";
import * as React from "react";
import { Text } from "react-native";

import type { RnNativeSearchBarViewRef } from "../RnNativeSearchBar.types";

const mockNativeMethods = {
  focus: jest.fn(() => Promise.resolve()),
  blur: jest.fn(() => Promise.resolve()),
  clearText: jest.fn(() => Promise.resolve()),
};

jest.mock("expo-modules-core", () => {
  const React = require("react");
  const { View } = require("react-native");
  const actual = jest.requireActual("expo-modules-core");
  return {
    ...actual,
    requireNativeModule: jest.fn((name: string) =>
      name === "RnNativeSearchBar" ? {} : actual.requireNativeModule(name),
    ),
    requireNativeViewManager: jest.fn((name: string) => {
      const MockNativeView = React.forwardRef(
        (props: object, ref: React.Ref<unknown>) => {
          React.useImperativeHandle(ref, () => mockNativeMethods);
          return React.createElement(View, {
            ...props,
            testID: "native-search-bar",
            nativeViewName: name,
          });
        },
      );
      return MockNativeView;
    }),
  };
});

// Imported after the mock so the module resolves the mocked native view.
const { RnNativeSearchBarView } = require("..") as typeof import("..");

describe("RnNativeSearchBarView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the native view registered as "RnNativeSearchBar"', () => {
    render(<RnNativeSearchBarView />);
    expect(screen.getByTestId("native-search-bar").props.nativeViewName).toBe(
      "RnNativeSearchBar",
    );
  });

  it("forwards all props to the native view", () => {
    const style = { width: 100, height: 50 };
    render(
      <RnNativeSearchBarView
        placeholder="Search"
        text="initial"
        textColor="#ff0000"
        appearance="dark"
        searchHints={["a", "b"]}
        style={style}
      />,
    );

    const nativeView = screen.getByTestId("native-search-bar");
    expect(nativeView.props).toEqual(
      expect.objectContaining({
        placeholder: "Search",
        text: "initial",
        textColor: "#ff0000",
        appearance: "dark",
        searchHints: ["a", "b"],
        style,
      }),
    );
  });

  it("updates props on re-render", () => {
    const { rerender } = render(
      <RnNativeSearchBarView text="first" searchHints={["a"]} />,
    );
    rerender(<RnNativeSearchBarView text="second" searchHints={["b", "c"]} />);

    const nativeView = screen.getByTestId("native-search-bar");
    expect(nativeView.props.text).toBe("second");
    expect(nativeView.props.searchHints).toEqual(["b", "c"]);
  });

  it("renders children as search results content", () => {
    render(
      <RnNativeSearchBarView>
        <Text>Result 1</Text>
        <Text>Result 2</Text>
      </RnNativeSearchBarView>,
    );

    expect(screen.getByText("Result 1")).toBeTruthy();
    expect(screen.getByText("Result 2")).toBeTruthy();
  });

  it.each([
    ["searchTextChanged", "onSearchTextChanged"],
    ["searchButtonClicked", "onSearchButtonClicked"],
    ["searchTextEditEndedEvent", "onSearchTextEditEndedEvent"],
  ] as const)("passes the native %s event to %s", (eventName, propName) => {
    const handler = jest.fn();
    render(<RnNativeSearchBarView {...{ [propName]: handler }} />);

    const event = { nativeEvent: { text: "query" } };
    fireEvent(screen.getByTestId("native-search-bar"), eventName, event);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(event);
  });

  it("exposes focus, blur and clearText through a ref", async () => {
    const ref = React.createRef<RnNativeSearchBarViewRef>();
    render(<RnNativeSearchBarView ref={ref} />);

    expect(ref.current).not.toBeNull();
    await act(async () => {
      await ref.current!.focus();
      await ref.current!.clearText();
      await ref.current!.blur();
    });

    expect(mockNativeMethods.focus).toHaveBeenCalledTimes(1);
    expect(mockNativeMethods.clearText).toHaveBeenCalledTimes(1);
    expect(mockNativeMethods.blur).toHaveBeenCalledTimes(1);
  });
});

const mockModule = {
  PI: Math.PI,
  hello: jest.fn(() => "Hello world! 👋"),
  setValueAsync: jest.fn(() => Promise.resolve()),
  addListener: jest.fn(() => ({ remove: jest.fn() })),
};

jest.mock("expo-modules-core", () => {
  const actual = jest.requireActual("expo-modules-core");
  return {
    ...actual,
    requireNativeModule: jest.fn((name: string) =>
      name === "RnNativeSearchBar"
        ? mockModule
        : actual.requireNativeModule(name),
    ),
    requireNativeViewManager: jest.fn(() => () => null),
  };
});

const { requireNativeModule } = require("expo-modules-core");
const RnNativeSearchBar = require("..") as typeof import("..");

describe("RnNativeSearchBar module", () => {
  it('loads the native module named "RnNativeSearchBar"', () => {
    expect(requireNativeModule).toHaveBeenCalledWith("RnNativeSearchBar");
  });

  it("exposes the PI constant", () => {
    expect(RnNativeSearchBar.PI).toBe(Math.PI);
  });

  it("calls the native hello function", () => {
    expect(RnNativeSearchBar.hello()).toBe("Hello world! 👋");
    expect(mockModule.hello).toHaveBeenCalledTimes(1);
  });

  it("forwards setValueAsync to native", async () => {
    await RnNativeSearchBar.setValueAsync("value");
    expect(mockModule.setValueAsync).toHaveBeenCalledWith("value");
  });

  it("subscribes to onChange events and returns a removable subscription", () => {
    const listener = jest.fn();
    const subscription = RnNativeSearchBar.addChangeListener(listener);

    expect(mockModule.addListener).toHaveBeenCalledWith("onChange", listener);
    expect(typeof subscription.remove).toBe("function");
  });
});

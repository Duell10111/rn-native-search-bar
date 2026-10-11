// The library ships native code for iOS and tvOS only, so only the iOS preset is used.
module.exports = {
  preset: 'jest-expo/ios',
  testPathIgnorePatterns: ['/node_modules/', '/build/', '/example/', '/exampleTVOS/'],
};

# Changelog

## [1.0.0-beta.14](https://github.com/Duell10111/rn-native-search-bar/compare/v1.0.0-beta.13...v1.0.0-beta.14) (2026-10-31)


### ⚠ BREAKING CHANGES

* clearText is now called via ref instead of a view tag, Expo SDK 52+ is required and the minimum deployment target is iOS/tvOS 15.1.

### breaking

* upgrade to Expo SDK 57, restore old architecture support and add tests ([dbad537](https://github.com/Duell10111/rn-native-search-bar/commit/dbad53710c26e5fa5843f1d37831553524d753b2))


### ✨ Features

* support new architecture (fabric) child mounting on iOS ([2009fd4](https://github.com/Duell10111/rn-native-search-bar/commit/2009fd40b2927c4cd54f74a7c53aada227cb6798))
* **tvOS:** implement gesture recognizer handling for search keyboard input ([0793f47](https://github.com/Duell10111/rn-native-search-bar/commit/0793f4728aef5fdd9df29452c854c196e69858ef))


### 📄 Documentation

* add AGENTS.md describing the release process ([5cffec0](https://github.com/Duell10111/rn-native-search-bar/commit/5cffec03f2b7daca39e0dc7a9fa0f7d81dd7e3ff))
* update README to include npm version badges and CI status ([6816aad](https://github.com/Duell10111/rn-native-search-bar/commit/6816aad418806e89f64e6109136ea9d72ceab689))
* update README with detailed API documentation and usage examples ([497c9e3](https://github.com/Duell10111/rn-native-search-bar/commit/497c9e332ec6cefdb5a9b66b92687d709391bf86))


### 🚀 Continuous Integration

* publish to npm via trusted publishing (OIDC) ([17190b2](https://github.com/Duell10111/rn-native-search-bar/commit/17190b2168663a0d0123c46066fe72e1f88aefd6))
* switch from semantic-release to release-please ([988c4e0](https://github.com/Duell10111/rn-native-search-bar/commit/988c4e0a0031d144283f1d35828dbe23f2af1533))

# repro-mattrothenberg-vue-storybook-5

Testing vue-storybook 0.4.0 and proposed PRs against vue-loader v14 and v15.

## Setup

#### Setup test-helper
```sh
cd test-helper
yarn
```

#### Setup vue-storybook that uses vue-loader v14 and webpack 3
```sh
cd v14
yarn
```

#### Setup vue-storybook that uses vue-loader v15 and webpack 4
```sh
cd v15
yarn
```

## Run storybook

#### V14
```sh
cd v14
CONFIG_OPTION=1 yarn storybook
```

Visit http://localhost:6005

#### V15
```sh
cd v15
CONFIG_OPTION=1 yarn serve:storybook
```

Visit http://localhost:6006

## `CONFIG_OPTION`

Use different ENV to test different conditions

| Config Option | Condition | Note
| :-- | :-- | :--
| 0 | USE_INDEX_BASED_MUTATION
| 1 | USE_INDEX_BASED_MUTATION_V15
| 2 | USE_RESOURCE_QUERY             | Uncomment `return require('vue-storybook-2');` in `test-helper/module-selector`
| 3 | USE_INJECT_UTILITY
| 4 | USE_RESOURCE_QUERY_AMOSHYDRA

Note: `vue-storybook-2` which point to `https://github.com/colinfindlay-nz/vue-storybook/tarball/master` will not work in webpack 3.
When testing inside v14 folder, it need to be uncommented in `test-helper/module-selector`.

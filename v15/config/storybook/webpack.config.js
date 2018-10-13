const OPTIONS = require('../../../test-helper/option-types');
const chosenVersion = require('../../../test-helper/module-selector');
const selectedConfigOption = require('../../../test-helper/selected-config-option');

module.exports = selectWebpackConfiguration(selectedConfigOption);

function selectWebpackConfiguration(webpackConfigurationChoice) {
  switch (webpackConfigurationChoice) {

    // Default configuration found in the original readme
    case OPTIONS.USE_INDEX_BASED_MUTATION: {
       return (storybookBaseConfig, configType) => {
        storybookBaseConfig.module.rules[1].options = {
          loaders: {
            story: chosenVersion.storyLoader // Add!
          }
        };
        return storybookBaseConfig;
      };
    }

    // Default configuration adapted to vue-cli
    case OPTIONS.USE_INDEX_BASED_MUTATION_V15: {
       return (storybookBaseConfig, configType) => {
        storybookBaseConfig.module.rules[0].use[1].options = {
          ...storybookBaseConfig.module.rules[0].use[1].options,
          loaders: {
            story: chosenVersion.storyLoader // Add!
          }
        };
        return storybookBaseConfig;
      };
    }

    // colinfindlay-nz / vue-loader v15 recommended configuration
    case OPTIONS.USE_RESOURCE_QUERY: {
      return (storybookBaseConfig, configType) => {
        storybookBaseConfig.module.rules.push(
          {
            resourceQuery: /blockType=story/,
            loader: chosenVersion.storyLoader
          }
        );
        return storybookBaseConfig;
      }
    }

    // amoshydra configuration util for vue-loader <= v15
    case OPTIONS.USE_INJECT_UTILITY: {
      return (storybookBaseConfig, configType) => {
        return chosenVersion.utility.configureWebpack(storybookBaseConfig);
      }
    }

    // colinfindlay-nz / vue-loader v15 recommended configuration
    case OPTIONS.USE_RESOURCE_QUERY_AMOSHYDRA: {
      return (storybookBaseConfig, configType) => {
        storybookBaseConfig.module.rules.push(
          {
            resourceQuery: /blockType=story/,
            loader: chosenVersion.storyLoader
          }
        );
        return storybookBaseConfig;
      }
    }
  }
}

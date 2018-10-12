const OPTIONS = {
  USE_INDEX_BASED_MUTATION: 0,
  USE_INDEX_BASED_MUTATION_V15: 1,
  USE_RESOURCE_QUERY: 2,
  USE_INJECT_UTILITY: 3,
  USE_RESOURCE_QUERY_AMOSHYDRA: 4,
};

const selectedConfigOption = parseInt(process.env.CONFIG_OPTION || '0', 10);

const chosenVersion = ((configOption) => {
  switch (configOption) {
    case 0:
    case 1:
      return require('vue-storybook');
    case 2:
      // return require('vue-storybook-2');
      break;
    case 3:
    case 4:
    default:
      return require('vue-storybook-3');
  }
})(selectedConfigOption);

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

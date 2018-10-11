const { storyLoader } = require("vue-storybook"); // Import!
module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.module.rules[1].options = {
    loaders: {
      story: storyLoader // Add!
    }
  };
  return storybookBaseConfig;
};
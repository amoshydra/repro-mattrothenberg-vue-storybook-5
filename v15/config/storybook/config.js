// Import Storybook + all 'yr plugins!
import { storiesOf, configure } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import { withNotes } from "@storybook/addon-notes";
import { withKnobs, text, color, select } from "@storybook/addon-knobs"; // eslint-disable-line

const selectedConfigOption = parseInt(process.env.CONFIG_OPTION || '0', 10);

// Import our helper
const chosenVersion = ((configOption) => {
  switch (configOption) {
    case 0:
    case 1:
      return require('vue-storybook');
    case 2:
      return require('vue-storybook-2');
    case 3:
    case 4:
    default:
      return require('vue-storybook-3');
  }
})(selectedConfigOption);

// Require the Vue SFC with <story> blocks inside
const req = require.context("../../src/stories", true, /\.vue$/);

// Programatically register these stories
function loadStories() {
  req.keys().forEach(filename => {
    // The last argument here is an object containing ALL of the plugins you've used in your SFC.
    chosenVersion.registerStories(req, filename, storiesOf, {
      withKnobs,
      withNotes,
      action,
      text
    });
  });
}

// Let's go!
configure(loadStories, module);

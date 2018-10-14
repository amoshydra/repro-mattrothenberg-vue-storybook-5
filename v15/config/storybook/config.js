// Import Storybook + all 'yr plugins!
const { storiesOf, configure } = require("@storybook/vue");
const { action } = require("@storybook/addon-actions");
const { withNotes } = require("@storybook/addon-notes");
const { withKnobs, text, color, select } = require("@storybook/addon-knobs"); // eslint-disable-line

// Import our helper
const chosenVersion = require('../../../test-helper/module-selector');

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

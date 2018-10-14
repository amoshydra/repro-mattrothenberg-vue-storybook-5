// Import Storybook + all 'yr plugins!
import { storiesOf, configure } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import { withNotes } from "@storybook/addon-notes";
import { withKnobs, text, color, select } from "@storybook/addon-knobs"; // eslint-disable-line

// Import our helper
import chosenVersion from '../../../test-helper/module-selector';

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

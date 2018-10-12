/* eslint-disable react/react-in-jsx-scope */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withNotes } from '@storybook/addon-notes';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/vue';
import { configure } from '@storybook/vue';

const selectedConfigOption = parseInt(process.env.CONFIG_OPTION || '0', 10);

// Import our helper
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
const req = require.context('./', true, /\.vue$/)

function loadStories() {
  req.keys().forEach((filename) => {
    chosenVersion.registerStories(req, filename, storiesOf, {withKnobs, withNotes, action, text})
  })
}

loadStories()
/* eslint-enable react/react-in-jsx-scope */

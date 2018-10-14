/* eslint-disable react/react-in-jsx-scope */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withNotes } from '@storybook/addon-notes';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/vue';
import { configure } from '@storybook/vue';

// Import our helper
import chosenVersion from '../../../test-helper/module-selector';
const req = require.context('./', true, /\.vue$/)

function loadStories() {
  req.keys().forEach((filename) => {
    chosenVersion.registerStories(req, filename, storiesOf, {withKnobs, withNotes, action, text})
  })
}

loadStories()
/* eslint-enable react/react-in-jsx-scope */

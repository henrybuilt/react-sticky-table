import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';
import { version } from '../package.json';

addons.setConfig({
  panelPosition: 'bottom',
  theme: create({
    base: 'light',
    brandTitle: `react-sticky-table@${version}`
  })
});
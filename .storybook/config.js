import { addParameters, configure, addDecorator } from '@storybook/angular';
import { create } from '@storybook/theming';
import { withA11y } from '@storybook/addon-a11y';
import { withTests } from '@storybook/addon-jest';
import results from '../.jest-test-results.json';
import { withCssResources } from '@storybook/addon-cssresources';

function loadStories() {
  // put welcome screen at the top of the list so it's the first one displayed
  require('../src/lib/welcome');

  // automatically import all files ending in *.stories.ts
  const req = require.context('../src/lib', true, /.stories.ts$/);
  req.keys().forEach(filename => req(filename));
}

const newViewports = {
  mobile: {
    name: 'Mobile',
    styles: {
      width: '375px',
      height: '667px',
    },
  },
  tablet: {
    name: 'Tablet',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  laptop: {
    name: 'Laptop',
    styles: {
      width: '1200px',
      height: '1024px',
    },
  },
};

addDecorator(withA11y)

addDecorator(withCssResources)
addParameters({
  cssresources: [
    {
      id: `Cupcake 2`,
      code: `<link rel="stylesheet" type="text/css" href="https://unpkg.com/@cupcake-ds/cupcake/dist/cupcake.css"></link>`,
      picked: false,
    }, {
      id: `Cupcake 1.x`,
      code: `<link rel="stylesheet" type="text/css" href="https://ipreo-cupcake.surge.sh/default.css"></link>`,
      picked: true,
    },
  ],
});


addParameters({
  options: {
    theme: create({
      base: 'light',
      barSelectedColor: '#1b6ec2',
      colorPrimary: '#1b6ec2', // primary color
      colorSecondary: '#1b6ec2', // secondary color
      fontBase: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      brandTitle: 'UI Framework',
      brandUrl: '#',
      brandImage: 'https://svgshare.com/i/BdT.svg'
    }),
    isFullscreen: false,
    panelPosition: 'bottom',
    sortStoriesByKind: true
  },
  viewport: {
    viewports: {
      ...newViewports,
    },
  },
  backgrounds: [
    { name: 'Default App BG', value: '#f8f9fa', default: true },
    { name: 'Dark', value: '#212529' },
    { name: 'Ipreo Blue', value: '#1b6ec2' },
    { name: 'IHS Teal', value: '#009596' },
  ],
});

addDecorator(
  withTests({
    results,
    filesExt: '((\\.specs?)|(\\.tests?))?(\\.ts)?$',
  })
);

configure(loadStories, module);

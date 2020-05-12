import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, text } from '@storybook/addon-knobs/react'

import './demo.css';

import Basic from './Basic/index';
import StickyAllSides from './StickyAllSides/index';
import Borders from './Borders/index';
import NoBorders from './NoBorders/index';
import ChangingContent from './ChangingContent/index';
import NoColumn from './NoColumn/index';
import NoHeader from './NoHeader/index';
import ResizingCells from './ResizingCells/index';
import CustomZ from './CustomZ/index';
import MultipleChangingStickies from './MultipleChangingStickies/index';
import Playground from './Playground/index';


storiesOf('Basic', module)
  .add('basic', () => <Basic />)
  .add('multiple changing stickies', () => <MultipleChangingStickies />)
  .add('sticky on all sides', () => <StickyAllSides />)
  .add('only sticky header', () => <NoColumn />)
  .add('only sticky column', () => <NoHeader />)
  .add('dynamically changing content', () => <ChangingContent />)
  .add('resizing cells', () => <ResizingCells />)
  .add('custom borders', () => <Borders />)
  .add('no borders', () => <NoBorders />)
  .add('custom z-index', () => <CustomZ />)
  .addDecorator(withKnobs)
  .add('playground', () => <Playground
    stickyHeaderCount={number('HeaderSticky', 0, { min: 0 })}
    leftStickyColumnCount={number('LeftSticky', 0, { min: 0 })}
    rightStickyColumnCount={number('RightSticky', 0, { min: 0 })}
    stickyFooterCount={number('FooterSticky', 0, { min: 0 })}
    width={text('width', '100%')}
    height={text('height', '200px')}
  />);


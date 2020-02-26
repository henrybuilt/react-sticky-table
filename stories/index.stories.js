import React from 'react';
import { storiesOf } from '@storybook/react';

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

storiesOf('Basic', module)
  .add('basic', () => <Basic />)
  .add('sticky on all sides', () => <StickyAllSides />)
  .add('only sticky header', () => <NoColumn />)
  .add('only sticky column', () => <NoHeader />)
  .add('dynamically changing content', () => <ChangingContent />)
  .add('resizing cells', () => <ResizingCells />)
  .add('custom borders', () => <Borders />)
  .add('no borders', () => <NoBorders />)
  .add('custom z-index', () => <CustomZ />);


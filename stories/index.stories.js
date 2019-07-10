import React from 'react';
import { storiesOf } from '@storybook/react';

import './demo.css';

import Basic from './Basic/index';
import ChangingContent from './ChangingContent/index';
import NoColumn from './NoColumn/index';
import NoHeader from './NoHeader/index';
import ResizingCells from './ResizingCells/index';

storiesOf('Basic', module)
  .add('Basic', () => <Basic />)
  .add('ChangingContent', () => <ChangingContent />)
  .add('NoColumn', () => <NoColumn />)
  .add('NoHeader', () => <NoHeader />)
  .add('ResizingCells', () => <ResizingCells />);


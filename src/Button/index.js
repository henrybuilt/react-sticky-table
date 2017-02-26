import React, { Component } from 'react';

import './index.css';

export default class Button extends Component {
  render() {
    return (
      <div className={'button'} {...this.props}>{this.props.children}</div>
    );
  }
}

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Row extends Component {
  render() {
    return (
      <div {...this.props} className={'row ' + (this.props.className || '')}>
        {this.props.children}
      </div>
    );
  }
}

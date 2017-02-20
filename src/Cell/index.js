import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Cell extends Component {
  render() {
    return (
      <div {...this.props} className={'cell ' + (this.props.className || '')}>
        {this.props.children}
      </div>
    );
  }
}

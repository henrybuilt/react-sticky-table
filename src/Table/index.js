import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Table extends Component {
  render() {
    return (
      <div {...this.props} className={'table ' + (this.props.className || '')}>
        {this.props.children}
      </div>
    );
  }
}

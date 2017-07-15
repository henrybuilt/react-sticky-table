import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Table extends Component {
  render() {
    return (
      <div {...this.props} className={'sticky-table-container ' + (this.props.className || '')}>
        {this.props.children}
      </div>
    );
  }
}

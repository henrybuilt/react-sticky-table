import React, { Component } from 'react';

import Basic from '../examples/Basic';
import './index.css';

export default class Demo extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <div className="wrapper">Sticky Table</div>
        </div>
        <div className="wrapper clearfix">
          <div className="menu left">
            <a href="#basic-example">Basic Example</a>
          </div>
          <div className="examples left">
            <div className="example" id="basic-example">
              <h1>Basic Example</h1>
              <Basic />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

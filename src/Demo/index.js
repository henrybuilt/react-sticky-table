import React, { Component } from 'react';

import Basic from '../examples/Basic';
import './index.css';

export default class Demo extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <div className="wrapper"><span style={{color: 'rgb(224, 108, 117)'}}>S</span><span style={{color: 'rgb(97, 174, 238)'}}>t</span><span style={{color: 'rgb(152, 195, 121)'}}>i</span><span style={{color: 'rgb(198, 120, 221)'}}>c</span><span style={{color: 'rgb(152, 195, 121)'}}>k</span><span style={{color: 'rgb(209, 154, 102)'}}>y</span> <span style={{color: 'rgb(224, 108, 117)'}}>T</span><span style={{color: 'rgb(97, 174, 238)'}}>a</span><span style={{color: 'rgb(209, 154, 102)'}}>b</span><span style={{color: 'rgb(198, 120, 221)'}}>l</span><span style={{color: 'rgb(152, 195, 121)'}}>e</span></div>
        </div>
        <div className="content wrapper clearfix">
          <div className="menu left">
            <a href="#basic-example">Basic Example</a>
          </div>
          <div className="examples left">
            <div className="example" id="basic-example">
              <h1>Basic Example</h1>
              <h3>Try resizing your browser and scrolling both vertically and horizontally</h3>
              <Basic />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

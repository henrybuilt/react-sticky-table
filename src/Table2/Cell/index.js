import React, {Component} from 'react';
import './index.css';

export default class Cell extends Component {
  render() {
    return (
      <div className="tcell cell" style={{
        height: this.props.height || 'auto',
        width: this.props.width || 'auto',
        minWidth: this.props.minWidth || this.props.width || 0
      }} id={this.props.id}>
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

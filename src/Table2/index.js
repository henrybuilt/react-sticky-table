import React, {Component} from 'react';
import './index.css';

export default class Table extends Component {
  render() {
    return (
      <div className={'table ' + this.props.className}>
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

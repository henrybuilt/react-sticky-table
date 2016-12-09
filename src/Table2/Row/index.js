import React, {Component} from 'react';
import './index.scss';

export default class Row extends Component {
  render() {
    return (
      <div className={'trow row' + (this.props.header ? ' header ' : '')} id={this.props.id}>
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

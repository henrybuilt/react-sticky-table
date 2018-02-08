import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Table extends Component {

  componentDidMount() {
    this.table.addEventListener('resize', this.props.onResize);
  }

  componentWillUnmount() {
    this.table.removeEventListener('resize', this.props.onResize);
  }

  render() {
    const {onResize, ...props} = this.props;

    return (
      <div {...props} className={'sticky-table-container ' + (this.props.className || '')} ref={(table) => {
        this.table = table;
      }}>
        {this.props.children}
      </div>
    );
  }
}

Table.defaultProps = {
  onResize: () => {
  }
};
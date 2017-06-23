import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../src/sticky-table.css';
import '../src/Cell/index.css';
import '../src/Row/index.css';
import '../src/Table/index.css';
import './index.css';
import { StickyTable, Table, Row, Cell } from '../src/index';

const defaultStyle = {
    width: '100%',
    height: '300px'
};

class Example extends Component {
    state = {
        colsCount: 4,
        rowsCount: 10,
        renderTable: true,
        autoWidthTable: true,
        locked: 0
    };

    handleLocked = (inc) => {
        var locked = inc ? ++this.state.locked : --this.state.locked;

        this.setState({
            locked: Math.max(locked, 0)
        });
    }

    handleValue = (field) => (event) => {
        this.setState({
            [field]: event.target.value
        });
    }

    handleToggle = (option) => {
        this.setState({
            [option]: !this.state[option]
        });
    }

    handleScroll(object) {
        //console.log(object);
    }

    render() {
        var { autoWidthTable, renderTable, rowsCount, colsCount, locked } = this.state;

        var tableClass = autoWidthTable ? 'auto-width' : '';
        var rows = [];
        var cells;

        for (var r = 1; r <= rowsCount; r++) {
            cells = [];

            for (var c = 1; c <= colsCount; c++) {
                cells.push(
                    <Cell style={{width: c === 2 ? '': '70px'}} key={c}>
                        { r == 1 && `Column${c}` }
                        { r != 1 && `Cell ${c} of row ${r}`}
                    </Cell>
                );
            }

            rows.push(<Row key={r}>{cells}</Row>);
        }

        return (
            <div>
                <div className='controls'>
                    <button onClick={() => this.handleToggle('renderTable')}>
                        Toggle table
                    </button>
                    <button onClick={() => this.handleToggle('autoWidthTable')}>
                        Toggle width
                    </button>
                    <button onClick={() => this.handleLocked(true)}>
                        Fixed +
                    </button>
                    <button onClick={() => this.handleLocked()}>
                        Fixed -
                    </button>
                    <input type="text"
                        name="colsCount"
                        value={colsCount}
                        onChange={this.handleValue('colsCount')}
                        title="cols" />
                    <input type="text"
                        name="rowsCount"
                        value={rowsCount}
                        onChange={this.handleValue('rowsCount')}
                        title="rows" />
                </div>
                <div>
                    { renderTable &&
                        <div className={'table ' + tableClass} style={defaultStyle}>
                            <StickyTable onScroll={this.handleScroll} stickyColumnsCount={locked}>
                                {rows}
                            </StickyTable>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

window.onload = () => {
    ReactDOM.render(
        <Example/>,
        document.getElementById('example')
    );
};

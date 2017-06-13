import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../src/sticky-table.css';
import '../src/Cell/index.css';
import '../src/Row/index.css';
import '../src/Table/index.css';
import './index.css';
import { StickyTable, Table, Row, Cell } from '../src/index';

class Example extends Component {
    state = {
        colsCount: 50,
        rowsCount: 1,
        renderTable: true,
        locked: 1
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

    handleToggle = () => {
        this.setState({
            renderTable: !this.state.renderTable
        });
    }

    handleScroll(object) {
        //console.log(object);
    }

    render() {
        var { renderTable, rowsCount, colsCount, locked } = this.state;
        var rows = [];
        var cells;

        for (var r = 1; r <= rowsCount; r++) {
            cells = [];

            for (var c = 1; c <= colsCount; c++) {
                cells.push(
                    <Cell key={c}>
                        { r == 1 && `Column${c}` }
                        { r != 1 && `Cell ${c} of row ${r}`}
                    </Cell>
                );
            }

            rows.push(<Row key={r}>{cells}</Row>);
        }

        return (
            <div>
                <div>
                    <button onClick={this.handleToggle}>
                        Toggle
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
                { renderTable && (
                    <div style={{width: '900px', height: '300px'}}>
                        <StickyTable onScroll={this.handleScroll} stickyColumnsCount={locked}>
                            {rows}
                        </StickyTable>
                    </div>
                ) }
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

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', './Table', './Row', './Cell', 'nodeproxy', 'element-resize-event'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('./Table'), require('./Row'), require('./Cell'), require('nodeproxy'), require('element-resize-event'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.Table, global.Row, global.Cell, global.nodeproxy, global.elementResizeEvent);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _Table, _Row, _Cell, proxy, elementResizeEvent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Cell = exports.Row = exports.Table = exports.StickyTable = undefined;

  var _react2 = _interopRequireDefault(_react);

  var _Table2 = _interopRequireDefault(_Table);

  var _Row2 = _interopRequireDefault(_Row);

  var _Cell2 = _interopRequireDefault(_Cell);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var StickyTable = function (_Component) {
    _inherits(StickyTable, _Component);

    function StickyTable(props) {
      _classCallCheck(this, StickyTable);

      var _this = _possibleConstructorReturn(this, (StickyTable.__proto__ || Object.getPrototypeOf(StickyTable)).call(this, props));

      _this.rowCount = 0;
      _this.columnCount = 0;

      _this.onResize = _this.onResize.bind(_this);
      _this.onColumnResize = _this.onColumnResize.bind(_this);
      _this.onScroll = _this.onScroll.bind(_this);
      return _this;
    }

    _createClass(StickyTable, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (document.getElementById('sticky-table-x-wrapper')) {
          document.getElementById('sticky-table-x-wrapper').addEventListener('scroll', this.onScroll);
        }
        if (document.getElementById('sticky-table')) {
          document.getElementById('sticky-table').addEventListener('scroll', this.onScroll);
        }

        if (document.getElementById('sticky-column')) {
          elementResizeEvent(document.getElementById('sticky-column'), this.onColumnResize);
        }

        if (document.getElementById('sticky-table-x-wrapper')) {
          elementResizeEvent(document.getElementById('sticky-table-x-wrapper').firstChild, this.onResize);
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (document.getElementById('sticky-table-x-wrapper')) {
          document.getElementById('sticky-table-x-wrapper').removeEventListener('scroll', this.handleScrollX);
        }
      }
    }, {
      key: 'onScroll',
      value: function onScroll() {
        var scrollLeft = document.getElementById('sticky-table-x-wrapper').scrollLeft;
        var scrollTop = document.getElementById('sticky-table').scrollTop;
        console.log(scrollLeft, scrollTop);
        document.getElementById('sticky-header').style.left = -1 * scrollLeft + 'px';
        document.getElementById('sticky-header').style.top = scrollTop + 'px';
        //document.getElementById('sticky-header').style.transform = 'translate(' + (-1 * scrollLeft) + ', ' + scrollTop + 'px)';
      }
    }, {
      key: 'onResize',
      value: function onResize() {
        this.setRowHeights();
        this.setColumnWidths();
      }
    }, {
      key: 'onColumnResize',
      value: function onColumnResize() {
        var column = document.getElementById('sticky-column');
        var cell = document.getElementById('sticky-table-x-wrapper').firstChild.firstChild.firstChild;
        var computedStyle = getComputedStyle(cell);
        var width = parseInt(column.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight), 10);

        if (cell) {
          cell.style.width = width + 'px';
          cell.style.minWidth = width + 'px';
          cell.style.backgroundColor = '#000';
        }

        this.onResize();
      }
    }, {
      key: 'setRowHeights',
      value: function setRowHeights() {
        var r, rowToCopy, height;

        for (r = 0; r < this.rowCount; r++) {
          //rowToCopy = document.getElementById('row-' + r);
          rowToCopy = document.getElementById('sticky-table-x-wrapper').firstChild.firstChild.childNodes[r];

          if (rowToCopy) {
            height = rowToCopy.clientHeight;

            document.getElementById('sticky-column-first-cell-' + r).style.height = height + 'px';
          }
        }
      }
    }, {
      key: 'setColumnWidths',
      value: function setColumnWidths() {
        var c, cellToCopy, computedStyle, width, cell;

        for (c = 0; c < this.columnCount; c++) {
          cellToCopy = document.getElementById('header-cell-' + c);

          if (cellToCopy) {
            computedStyle = getComputedStyle(cellToCopy);
            width = cellToCopy.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight);
            cell = document.getElementById('sticky-header-cell-' + c);

            cell.style.width = width + 'px';
            cell.style.minWidth = width + 'px';
          }
        }
      }
    }, {
      key: 'getStickyColumn',
      value: function getStickyColumn(rows) {
        var cells;
        var stickyRows = [];

        rows.forEach(proxy(function (row, r) {
          cells = row.props.children;

          stickyRows.push(_react2.default.createElement(
            _Row2.default,
            _extends({}, row.props, { id: '', key: r }),
            _react2.default.createElement(_Cell2.default, { id: 'sticky-column-first-cell-' + r }),
            cells[0]
          ));
        }, this));

        return stickyRows;
      }
    }, {
      key: 'getStickyHeader',
      value: function getStickyHeader(rows) {
        var row = rows[0];
        var cells = [];

        row.props.children.forEach(function (cell, c) {
          cells.push(_react2.default.cloneElement(cell, { id: 'sticky-header-cell-' + c, style: {} }));
        });

        return _react2.default.createElement(
          _Row2.default,
          _extends({}, row.props, { id: 'sticky-header-row' }),
          cells
        );
      }
    }, {
      key: 'render',
      value: function render() {
        var rows = _react2.default.Children.toArray(this.props.children);
        var stickyColumn, stickyHeader;

        this.rowCount = rows.length;
        this.columnCount = rows[0].props.children.length;

        if (rows.length) {
          stickyColumn = this.getStickyColumn(rows);
          stickyHeader = this.getStickyHeader(rows);
        }

        return _react2.default.createElement(
          'div',
          { className: 'sticky-table ' + (this.props.className || ''), id: 'sticky-table' },
          _react2.default.createElement(
            'div',
            { className: 'sticky-header', id: 'sticky-header' },
            _react2.default.createElement(
              _Table2.default,
              null,
              stickyHeader
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'sticky-table-y-wrapper' },
            _react2.default.createElement(
              'div',
              { className: 'sticky-column', id: 'sticky-column' },
              _react2.default.createElement(
                _Table2.default,
                null,
                stickyColumn
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'sticky-table-x-wrapper', id: 'sticky-table-x-wrapper' },
              _react2.default.createElement(
                _Table2.default,
                null,
                rows
              )
            )
          )
        );
      }
    }]);

    return StickyTable;
  }(_react.Component);

  StickyTable.propTypes = {
    rowCount: _react.PropTypes.number, //Including header
    columnCount: _react.PropTypes.number
  };

  exports.StickyTable = StickyTable;
  exports.Table = _Table2.default;
  exports.Row = _Row2.default;
  exports.Cell = _Cell2.default;
});
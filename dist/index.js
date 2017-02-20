(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', './Table', './Row', './Cell', 'underscore', 'nodeproxy', 'element-resize-event'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('./Table'), require('./Row'), require('./Cell'), require('underscore'), require('nodeproxy'), require('element-resize-event'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.Table, global.Row, global.Cell, global.underscore, global.nodeproxy, global.elementResizeEvent);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _Table, _Row, _Cell, _, proxy, elementResizeEvent) {
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

      _this.id = Math.floor(Math.random() * 1000000000) + '';

      _this.rowCount = 0;
      _this.columnCount = 0;

      _this.suppressScroll = false;

      _this.stickyColumnCount = props.stickyColumnCount === 0 ? 0 : _this.stickyHeaderCount || 1;
      _this.stickyHeaderCount = props.stickyHeaderCount === 0 ? 0 : _this.stickyHeaderCount || 1;

      _this.onResize = _this.onResize.bind(_this);
      _this.onColumnResize = _this.onColumnResize.bind(_this);
      _this.setScrollBarWrapperDims = _this.setScrollBarWrapperDims.bind(_this);
      _this.onScrollX = _this.onScrollX.bind(_this);
      _this.scrollXScrollbar = _.throttle(_this.scrollXScrollbar.bind(_this), 30);
      _this.scrollYScrollbar = _.throttle(_this.scrollYScrollbar.bind(_this), 30);
      return _this;
    }

    _createClass(StickyTable, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.table = document.getElementById('sticky-table-' + this.id);

        if (this.table) {
          this.realTable = this.table.querySelector('#sticky-table-x-wrapper').firstChild;
          this.xScrollbar = this.table.querySelector('#x-scrollbar');
          this.yScrollbar = this.table.querySelector('#y-scrollbar');
          this.xWrapper = this.table.querySelector('#sticky-table-x-wrapper');
          this.yWrapper = this.table.querySelector('#sticky-table-y-wrapper');
          this.stickyHeader = this.table.querySelector('#sticky-header');
          this.stickyColumn = this.table.querySelector('#sticky-column');
          this.stickyCorner = this.table.querySelector('#sticky-corner');

          this.xWrapper.addEventListener('scroll', this.onScrollX);

          elementResizeEvent(this.stickyColumn, this.onColumnResize);
          elementResizeEvent(this.realTable, this.onResize);

          this.onResize();
          setTimeout(this.onResize);
          this.addScrollBarEventHandlers();
          this.setScrollBarWrapperDims();
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.table) {
          this.xWrapper.removeEventListener('scroll', this.onScrollX);
        }
      }
    }, {
      key: 'addScrollBarEventHandlers',
      value: function addScrollBarEventHandlers() {
        var _this2 = this;

        //X Scrollbars
        this.xWrapper.addEventListener('scroll', this.scrollXScrollbar);
        this.xScrollbar.addEventListener('scroll', proxy(function () {
          if (!_this2.suppressScroll) {
            _this2.xWrapper.scrollLeft = _this2.xScrollbar.scrollLeft;
            _this2.suppressScroll = true;
          } else {
            _this2.suppressScroll = false;
          }
        }, this));

        //Y Scrollbars
        this.yWrapper.addEventListener('scroll', this.scrollYScrollbar);
        this.yScrollbar.addEventListener('scroll', proxy(function () {
          if (!_this2.suppressScroll) {
            _this2.yWrapper.scrollTop = _this2.yScrollbar.scrollTop;
            _this2.suppressScroll = true;
          } else {
            _this2.suppressScroll = false;
          }
        }, this));
      }
    }, {
      key: 'onScrollX',
      value: function onScrollX() {
        var scrollLeft = Math.max(this.xWrapper.scrollLeft, 0); //Can't have it being less than 0...
        this.stickyHeader.style.transform = 'translate(' + -1 * scrollLeft + 'px, 0)';
      }
    }, {
      key: 'scrollXScrollbar',
      value: function scrollXScrollbar() {
        if (!this.suppressScroll) {
          this.xScrollbar.scrollLeft = this.xWrapper.scrollLeft;
          this.suppressScroll = true;
        } else {
          this.suppressScroll = false;
        }
      }
    }, {
      key: 'scrollYScrollbar',
      value: function scrollYScrollbar() {
        if (!this.suppressScroll) {
          this.yScrollbar.scrollTop = this.yWrapper.scrollTop;
          this.suppressScroll = true;
        } else {
          this.suppressScroll = false;
        }
      }
    }, {
      key: 'onResize',
      value: function onResize() {
        this.setRowHeights();
        this.setColumnWidths();
        this.setScrollBarDims();
      }
    }, {
      key: 'setScrollBarWrapperDims',
      value: function setScrollBarWrapperDims() {
        this.xScrollbar.style.width = 'calc(100% - ' + this.stickyColumn.offsetWidth + 'px)';
        this.xScrollbar.style.left = this.stickyColumn.offsetWidth + 'px';

        this.yScrollbar.style.height = 'calc(100% - ' + this.stickyHeader.offsetHeight + 'px)';
        this.yScrollbar.style.top = this.stickyHeader.offsetHeight + 'px';
      }
    }, {
      key: 'setScrollBarDims',
      value: function setScrollBarDims() {
        this.xScrollbar.firstChild.style.width = this.getSizeWithoutBoxSizing(this.realTable.firstChild).width - this.stickyColumn.offsetWidth + 'px';
        this.yScrollbar.firstChild.style.height = this.getSizeWithoutBoxSizing(this.realTable).height - this.stickyHeader.offsetHeight + 'px';
      }
    }, {
      key: 'onColumnResize',
      value: function onColumnResize() {
        var columnCell = this.stickyColumn.firstChild.firstChild.childNodes[0];
        var cell = this.realTable.firstChild.firstChild;
        var dims = this.getSizeWithoutBoxSizing(columnCell);

        if (cell) {
          cell.style.width = dims.width + 'px';
          cell.style.minWidth = dims.width + 'px';
          //cell.style.height = dims.height + 'px';
          //cell.style.minHeight = dims.height + 'px';
        }

        this.onResize();
        this.setScrollBarWrapperDims();
      }
    }, {
      key: 'setRowHeights',
      value: function setRowHeights() {
        var r, cellToCopy, height;

        if (this.stickyColumnCount) {
          for (r = 0; r < this.rowCount; r++) {
            cellToCopy = this.realTable.childNodes[r].firstChild;

            if (cellToCopy) {
              height = this.getSizeWithoutBoxSizing(cellToCopy).height;

              this.stickyColumn.firstChild.childNodes[r].firstChild.style.height = height + 'px';

              if (r === 0 && this.stickyCorner.firstChild.firstChild) {
                this.stickyCorner.firstChild.firstChild.firstChild.style.height = height + 'px';
              }
            }
          }
        }
      }
    }, {
      key: 'setColumnWidths',
      value: function setColumnWidths() {
        var c, cellToCopy, cellStyle, width, cell;

        if (this.stickyHeaderCount) {
          for (c = 0; c < this.columnCount; c++) {
            cellToCopy = this.realTable.firstChild.childNodes[c];

            if (cellToCopy) {
              width = this.getSizeWithoutBoxSizing(cellToCopy).width;
              cell = this.table.querySelector('#sticky-header-cell-' + c);

              cell.style.width = width + 'px';
              cell.style.minWidth = width + 'px';

              if (c === 0 && this.stickyCorner.firstChild.firstChild) {
                cell = this.stickyCorner.firstChild.firstChild.firstChild;

                cell.style.width = width + 'px';
                cell.style.minWidth = width + 'px';
              }
            }
          }
        }
      }
    }, {
      key: 'getStickyColumn',
      value: function getStickyColumn(rows) {
        var cells;
        var stickyRows = [];

        rows.forEach(proxy(function (row, r) {
          cells = _react2.default.Children.toArray(row.props.children);

          stickyRows.push(_react2.default.createElement(
            _Row2.default,
            _extends({}, row.props, { id: '', key: r }),
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

        _react2.default.Children.toArray(row.props.children).forEach(function (cell, c) {
          cells.push(_react2.default.cloneElement(cell, { id: 'sticky-header-cell-' + c, key: c }));
        });

        return _react2.default.createElement(
          _Row2.default,
          _extends({}, row.props, { id: 'sticky-header-row' }),
          cells
        );
      }
    }, {
      key: 'getStickyCorner',
      value: function getStickyCorner(rows) {
        var cells;
        var stickyCorner = [];

        rows.forEach(proxy(function (row, r) {
          if (r === 0) {
            cells = _react2.default.Children.toArray(row.props.children);

            stickyCorner.push(_react2.default.createElement(
              _Row2.default,
              _extends({}, row.props, { id: '', key: r }),
              cells[0]
            ));
          }
        }, this));

        return stickyCorner;
      }
    }, {
      key: 'getStyle',
      value: function getStyle(node) {
        var browserSupportsComputedStyle = typeof getComputedStyle !== 'undefined';

        return browserSupportsComputedStyle ? getComputedStyle(node, null) : node.currentStyle;
      }
    }, {
      key: 'getSizeWithoutBoxSizing',
      value: function getSizeWithoutBoxSizing(node) {
        var nodeStyle = this.getStyle(node);
        var width = node.offsetWidth - parseFloat(nodeStyle.paddingLeft) - parseFloat(nodeStyle.paddingRight) - parseInt(nodeStyle.borderLeftWidth, 10) - parseInt(nodeStyle.borderRightWidth, 10);

        var height = node.offsetHeight - parseFloat(nodeStyle.paddingTop) - parseFloat(nodeStyle.paddingBottom) - parseInt(nodeStyle.borderTopWidth, 10) - parseInt(nodeStyle.borderBottomWidth, 10);

        return { width: width, height: height };
      }
    }, {
      key: 'render',
      value: function render() {
        var rows = _react2.default.Children.toArray(this.props.children);
        var stickyColumn, stickyHeader, stickyCorner;

        this.rowCount = rows.length;
        this.columnCount = rows[0] && _react2.default.Children.toArray(rows[0].props.children).length || 0;

        if (rows.length) {
          if (this.stickyColumnCount > 0 && this.stickyHeaderCount > 0) {
            stickyCorner = this.getStickyCorner(rows);
          }
          if (this.stickyColumnCount > 0) {
            stickyColumn = this.getStickyColumn(rows);
          }
          if (this.stickyHeaderCount > 0) {
            stickyHeader = this.getStickyHeader(rows);
          }
        }

        return _react2.default.createElement(
          'div',
          { className: 'sticky-table ' + (this.props.className || ''), id: 'sticky-table-' + this.id },
          _react2.default.createElement(
            'div',
            { id: 'x-scrollbar' },
            _react2.default.createElement('div', null)
          ),
          _react2.default.createElement(
            'div',
            { id: 'y-scrollbar' },
            _react2.default.createElement('div', null)
          ),
          _react2.default.createElement(
            'div',
            { className: 'sticky-corner', id: 'sticky-corner' },
            _react2.default.createElement(
              _Table2.default,
              null,
              stickyCorner
            )
          ),
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
            { className: 'sticky-table-y-wrapper', id: 'sticky-table-y-wrapper' },
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
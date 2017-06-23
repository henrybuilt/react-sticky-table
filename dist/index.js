(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', './Table', './Row', './Cell', 'element-resize-event'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('./Table'), require('./Row'), require('./Cell'), require('element-resize-event'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.Table, global.Row, global.Cell, global.elementResizeEvent);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _Table, _Row, _Cell, elementResizeEvent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Cell = exports.Row = exports.Table = exports.StickyTable = undefined;

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

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

  var StickyTable = function (_PureComponent) {
    _inherits(StickyTable, _PureComponent);

    function StickyTable(props) {
      _classCallCheck(this, StickyTable);

      var _this = _possibleConstructorReturn(this, (StickyTable.__proto__ || Object.getPrototypeOf(StickyTable)).call(this, props));

      _this.setScrollData = function () {
        _this.suppressScrollX = false;
        _this.suppressScrollY = false;

        return _this.scrollData = {
          scrollTop: _this.yScrollbar.scrollTop,
          scrollHeight: _this.yScrollbar.scrollHeight,
          clientHeight: _this.yScrollbar.clientHeight,
          scrollLeft: _this.xScrollbar.scrollLeft,
          scrollWidth: _this.xScrollbar.scrollWidth,
          clientWidth: _this.xScrollbar.clientWidth
        };
      };

      _this.onScrollBarX = function () {
        if (!_this.suppressScrollX) {
          _this.scrollData.scrollLeft = _this.xWrapper.scrollLeft = _this.xScrollbar.scrollLeft;
          _this.suppressScrollX = true;
        } else {
          _this.handleScroll();
          _this.suppressScrollX = false;
        }
      };

      _this.onScrollBarY = function () {
        if (!_this.suppressScrollY) {
          _this.scrollData.scrollTop = _this.yWrapper.scrollTop = _this.yScrollbar.scrollTop;
          _this.suppressScrollY = true;
        } else {
          _this.handleScroll();
          _this.suppressScrollY = false;
        }
      };

      _this.onScrollX = function () {
        var scrollLeft = Math.max(_this.xWrapper.scrollLeft, 0);
        _this.stickyHeader.style.transform = 'translate(' + -1 * scrollLeft + 'px, 0)';
      };

      _this.scrollXScrollbar = function () {
        if (!_this.suppressScrollX) {
          _this.scrollData.scrollLeft = _this.xScrollbar.scrollLeft = _this.xWrapper.scrollLeft;
          _this.suppressScrollX = true;
        } else {
          _this.handleScroll();
          _this.suppressScrollX = false;
        }
      };

      _this.scrollYScrollbar = function () {
        if (!_this.suppressScrollY) {
          _this.scrollData.scrollTop = _this.yScrollbar.scrollTop = _this.yWrapper.scrollTop;
          _this.suppressScrollY = true;
        } else {
          _this.handleScroll();
          _this.suppressScrollY = false;
        }
      };

      _this.handleScroll = function () {
        if (_this.props.onScroll) {
          _this.props.onScroll(_this.scrollData);
        }
      };

      _this.onResize = function () {
        _this.setScrollBarDims();
        _this.setScrollBarWrapperDims();

        _this.setRowHeights();
        _this.setColumnWidths();

        _this.setScrollData();
        _this.handleScroll();
      };

      _this.setScrollBarWrapperDims = function () {
        _this.xScrollbar.style.width = 'calc(100% - ' + _this.yScrollSize + 'px)';
        _this.yScrollbar.style.height = 'calc(100% - ' + _this.stickyHeader.offsetHeight + 'px)';
        _this.yScrollbar.style.top = _this.stickyHeader.offsetHeight + 'px';
      };

      _this.id = Math.floor(Math.random() * 1000000000) + '';

      _this.rowCount = 0;
      _this.columnCount = 0;
      _this.xScrollSize = 0;
      _this.yScrollSize = 0;

      _this.stickyHeaderCount = props.stickyHeaderCount === 0 ? 0 : _this.stickyHeaderCount || 1;

      _this.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
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
          this.stickyHeader = this.table.querySelector('#sticky-table-header');
          this.stickyColumn = this.table.querySelector('#sticky-table-column');
          this.stickyCorner = this.table.querySelector('#sticky-table-corner');
          this.setScrollData();

          elementResizeEvent(this.realTable, this.onResize);

          this.onResize();
          setTimeout(this.onResize);
          this.addScrollBarEventHandlers();
        }
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        this.onResize();
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.table) {
          this.xWrapper.removeEventListener('scroll', this.onScrollX);
          this.xWrapper.removeEventListener('scroll', this.scrollXScrollbar);
          this.xScrollbar.removeEventListener('scroll', this.onScrollBarX);

          this.yWrapper.removeEventListener('scroll', this.scrollYScrollbar);
          this.yScrollbar.removeEventListener('scroll', this.onScrollBarY);

          elementResizeEvent.unbind(this.realTable);
        }
      }
    }, {
      key: 'addScrollBarEventHandlers',
      value: function addScrollBarEventHandlers() {
        this.xWrapper.addEventListener('scroll', this.onScrollX);

        //X Scrollbars
        this.xWrapper.addEventListener('scroll', this.scrollXScrollbar);
        this.xScrollbar.addEventListener('scroll', this.onScrollBarX);

        //Y Scrollbars
        this.yWrapper.addEventListener('scroll', this.scrollYScrollbar);
        this.yScrollbar.addEventListener('scroll', this.onScrollBarY);
      }
    }, {
      key: 'setScrollBarPaddings',
      value: function setScrollBarPaddings() {
        var scrollPadding = '0px 0px ' + this.xScrollSize + 'px 0px';
        this.table.style.padding = scrollPadding;

        var scrollPadding = '0px ' + this.yScrollSize + 'px 0px 0px';
        this.xWrapper.firstChild.style.padding = scrollPadding;
      }
    }, {
      key: 'setScrollBarDims',
      value: function setScrollBarDims() {
        this.xScrollSize = this.xScrollbar.offsetHeight - this.xScrollbar.clientHeight;
        this.yScrollSize = this.yScrollbar.offsetWidth - this.yScrollbar.clientWidth;

        if (!this.isFirefox) {
          this.setScrollBarPaddings();
        }

        var width = this.getSize(this.realTable.firstChild).width;
        this.xScrollbar.firstChild.style.width = width + 'px';

        var height = this.getSize(this.realTable).height + this.xScrollSize - this.stickyHeader.offsetHeight;
        this.yScrollbar.firstChild.style.height = height + 'px';

        if (this.xScrollSize) this.xScrollbar.style.height = this.xScrollSize + 1 + 'px';
        if (this.yScrollSize) this.yScrollbar.style.width = this.yScrollSize + 1 + 'px';
      }
    }, {
      key: 'setRowHeights',
      value: function setRowHeights() {
        var r, cellToCopy, height;

        if (this.props.stickyColumnsCount) {
          for (r = 0; r < this.rowCount; r++) {
            cellToCopy = this.realTable.childNodes[r].firstChild;

            if (cellToCopy) {
              height = this.getSize(cellToCopy).height;
              this.stickyColumn.firstChild.childNodes[r].firstChild.style.height = height + 'px';

              if (r === 0 && this.stickyCorner.firstChild.childNodes[r]) {
                this.stickyCorner.firstChild.firstChild.firstChild.style.height = height + 'px';
              }
            }
          }
        }
      }
    }, {
      key: 'setColumnWidths',
      value: function setColumnWidths() {
        var c, cellToCopy, cellStyle, width, cell, stickyWidth;

        if (this.stickyHeaderCount) {
          stickyWidth = 0;

          for (c = 0; c < this.columnCount; c++) {
            cellToCopy = this.realTable.firstChild.childNodes[c];

            if (cellToCopy) {
              width = this.getSize(cellToCopy).width;

              cell = this.table.querySelector('#sticky-header-cell-' + c);

              cell.style.width = width + 'px';
              cell.style.minWidth = width + 'px';

              var fixedColumnsHeader = this.stickyCorner.firstChild.firstChild;
              if (fixedColumnsHeader && fixedColumnsHeader.childNodes[c]) {
                cell = fixedColumnsHeader.childNodes[c];
                cell.style.width = width + 'px';
                cell.style.minWidth = width + 'px';

                cell = fixedColumnsHeader.childNodes[c];
                cell.style.width = width + 'px';
                cell.style.minWidth = width + 'px';

                stickyWidth += width;
              }
            }
          }

          this.stickyColumn.firstChild.style.width = stickyWidth + 'px';
          this.stickyColumn.firstChild.style.minWidth = stickyWidth + 'px';
        }
      }
    }, {
      key: 'getStickyColumns',
      value: function getStickyColumns(rows) {
        var columnsCount = this.props.stickyColumnsCount;
        var cells;
        var stickyRows = [];

        rows.forEach(function (row, r) {
          cells = _react2.default.Children.toArray(row.props.children);

          stickyRows.push(_react2.default.createElement(
            _Row2.default,
            _extends({}, row.props, { id: '', key: r }),
            cells.slice(0, columnsCount)
          ));
        });

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
        var columnsCount = this.props.stickyColumnsCount;
        var cells;
        var stickyCorner = [];

        rows.forEach(function (row, r) {
          if (r === 0) {
            cells = _react2.default.Children.toArray(row.props.children);

            stickyCorner.push(_react2.default.createElement(
              _Row2.default,
              _extends({}, row.props, { id: '', key: r }),
              cells.slice(0, columnsCount)
            ));
          }
        });

        return stickyCorner;
      }
    }, {
      key: 'getSize',
      value: function getSize(node) {
        var width = node ? node.getBoundingClientRect().width : 0;
        var height = node ? node.getBoundingClientRect().height : 0;

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
          if (this.props.stickyColumnsCount > 0 && this.stickyHeaderCount > 0) {
            stickyCorner = this.getStickyCorner(rows);
          }
          if (this.props.stickyColumnsCount > 0) {
            stickyColumn = this.getStickyColumns(rows);
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
            { className: 'sticky-table-corner', id: 'sticky-table-corner' },
            _react2.default.createElement(
              _Table2.default,
              null,
              stickyCorner
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'sticky-table-header', id: 'sticky-table-header' },
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
              { className: 'sticky-table-column', id: 'sticky-table-column' },
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
  }(_react.PureComponent);

  StickyTable.propTypes = {
    stickyHeaderCount: _propTypes2.default.number,
    stickyColumnsCount: _propTypes2.default.number,
    onScroll: _propTypes2.default.func,

    rowCount: _propTypes2.default.number, //Including header
    columnCount: _propTypes2.default.number
  };

  exports.StickyTable = StickyTable;
  exports.Table = _Table2.default;
  exports.Row = _Row2.default;
  exports.Cell = _Cell2.default;
});
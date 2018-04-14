(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', './Table', './Row', './Cell'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('./Table'), require('./Row'), require('./Cell'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.Table, global.Row, global.Cell);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _Table, _Row, _Cell) {
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

      _this.rowCount = 0;
      _this.columnCount = 0;
      _this.xScrollSize = 0;
      _this.yScrollSize = 0;

      _this.dom = {};

      _this.stickyHeaderCount = props.stickyHeaderCount === 0 ? 0 : _this.stickyHeaderCount || 1;

      _this.isFirefox = navigator && navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

      ['onScrollX', 'onScrollBarX', 'onScrollBarY', 'scrollXScrollbar', 'scrollYScrollbar', 'considerResizing'].forEach(function (fn) {
        _this[fn] = _this[fn].bind(_this);
      });
      return _this;
    }

    /**
     * @returns {undefined}
     */


    _createClass(StickyTable, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        if (this.dom.wrapper) {
          this.dom.bodyTable = this.dom.wrapper.querySelector('.sticky-table-x-wrapper .sticky-table-table');
          this.dom.xScrollbar = this.dom.wrapper.querySelector('.x-scrollbar');
          this.dom.yScrollbar = this.dom.wrapper.querySelector('.y-scrollbar');
          this.dom.xWrapper = this.dom.wrapper.querySelector('.sticky-table-x-wrapper');
          this.dom.yWrapper = this.dom.wrapper.querySelector('.sticky-table-y-wrapper');
          this.dom.stickyHeader = this.dom.wrapper.querySelector('.sticky-table-header');
          this.dom.stickyColumn = this.dom.wrapper.querySelector('.sticky-table-column');
          this.dom.stickyCorner = this.dom.wrapper.querySelector('.sticky-table-corner');
          this.dom.stickyHeaderTable = this.dom.stickyHeader.querySelector('.sticky-table-table');
          this.dom.stickyColumnTable = this.dom.stickyColumn.querySelector('.sticky-table-table');
          this.dom.stickyCornerTable = this.dom.stickyCorner.querySelector('.sticky-table-table');

          this.setScrollData();

          this.considerResizing();
          setTimeout(function () {
            return _this2.considerResizing();
          });

          this.resizeInterval = setInterval(this.considerResizing, 60);

          //X Scrollbars
          this.dom.xWrapper.addEventListener('scroll', this.onScrollX);
          this.dom.xWrapper.addEventListener('scroll', this.scrollXScrollbar);
          this.dom.xScrollbar.addEventListener('scroll', this.onScrollBarX);

          //Y Scrollbars
          this.dom.yWrapper.addEventListener('scroll', this.scrollYScrollbar);
          this.dom.yScrollbar.addEventListener('scroll', this.onScrollBarY);
        }
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        this.considerResizing();
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.dom.wrapper) {
          this.dom.xWrapper.removeEventListener('scroll', this.onScrollX);
          this.dom.xWrapper.removeEventListener('scroll', this.scrollXScrollbar);
          this.dom.xScrollbar.removeEventListener('scroll', this.onScrollBarX);

          this.dom.yWrapper.removeEventListener('scroll', this.scrollYScrollbar);
          this.dom.yScrollbar.removeEventListener('scroll', this.onScrollBarY);

          clearInterval(this.resizeInterval);
        }
      }
    }, {
      key: 'setScrollData',
      value: function setScrollData() {
        this.suppressScrollX = false;
        this.suppressScrollY = false;

        return this.scrollData = {
          scrollTop: this.dom.yScrollbar.scrollTop,
          scrollHeight: this.dom.yScrollbar.scrollHeight,
          clientHeight: this.dom.yScrollbar.clientHeight,
          scrollLeft: this.dom.xScrollbar.scrollLeft,
          scrollWidth: this.dom.xScrollbar.scrollWidth,
          clientWidth: this.dom.xScrollbar.clientWidth
        };
      }
    }, {
      key: 'onScrollBarX',
      value: function onScrollBarX() {
        if (!this.suppressScrollX) {
          this.scrollData.scrollLeft = this.dom.xWrapper.scrollLeft = this.dom.xScrollbar.scrollLeft;
          this.suppressScrollX = true;
        } else {
          this.handleScroll();
          this.suppressScrollX = false;
        }
      }
    }, {
      key: 'onScrollBarY',
      value: function onScrollBarY() {
        if (!this.suppressScrollY) {
          this.scrollData.scrollTop = this.dom.yWrapper.scrollTop = this.dom.yScrollbar.scrollTop;
          this.suppressScrollY = true;
        } else {
          this.handleScroll();
          this.suppressScrollY = false;
        }
      }
    }, {
      key: 'onScrollX',
      value: function onScrollX() {
        var scrollLeft = Math.max(this.dom.xWrapper.scrollLeft, 0);
        this.dom.stickyHeaderTable.style.transform = 'translate(' + -1 * scrollLeft + 'px, 0) translateZ(0)';
      }
    }, {
      key: 'scrollXScrollbar',
      value: function scrollXScrollbar() {
        if (!this.suppressScrollX) {
          this.scrollData.scrollLeft = this.dom.xScrollbar.scrollLeft = this.dom.xWrapper.scrollLeft;
          this.suppressScrollX = true;
        } else {
          this.handleScroll();
          this.suppressScrollX = false;
        }
      }
    }, {
      key: 'scrollYScrollbar',
      value: function scrollYScrollbar() {
        if (!this.suppressScrollY) {
          this.scrollData.scrollTop = this.dom.yScrollbar.scrollTop = this.dom.yWrapper.scrollTop;
          this.suppressScrollY = true;
        } else {
          this.handleScroll();
          this.suppressScrollY = false;
        }
      }
    }, {
      key: 'handleScroll',
      value: function handleScroll() {
        if (this.props.onScroll) {
          this.props.onScroll(this.scrollData);
        }
      }
    }, {
      key: 'considerResizing',
      value: function considerResizing() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$forceCellTableRe = _ref.forceCellTableResize,
            forceCellTableResize = _ref$forceCellTableRe === undefined ? false : _ref$forceCellTableRe,
            _ref$forceWrapperResi = _ref.forceWrapperResize,
            forceWrapperResize = _ref$forceWrapperResi === undefined ? false : _ref$forceWrapperResi;

        var wrapperSize = {
          width: this.dom.wrapper.offsetWidth,
          height: this.dom.wrapper.offsetWidth
        };

        var tableCellSizes = {
          corner: { width: this.dom.stickyCornerTable.offsetWidth, height: this.dom.stickyCornerTable.offsetHeight },
          header: { width: this.dom.stickyHeaderTable.offsetWidth, height: this.dom.stickyHeaderTable.offsetHeight },
          column: { width: this.dom.stickyColumnTable.offsetWidth, height: this.dom.stickyColumnTable.offsetHeight },
          body: { width: this.dom.bodyTable.offsetWidth, height: this.dom.bodyTable.offsetHeight }
        };

        var tableCellSizesChanged = JSON.stringify(tableCellSizes) !== JSON.stringify(this.oldTableCellSizes);
        var wrapperSizeChanged = JSON.stringify(wrapperSize) !== JSON.stringify(this.oldWrapperSize);

        if (forceCellTableResize || !this.oldTableCellSizes || tableCellSizesChanged) {
          this.setRowHeights();
          this.setColumnWidths();

          this.oldTableCellSizes = tableCellSizes;
        }

        if (forceWrapperResize || !this.oldWrapperSize || wrapperSizeChanged || tableCellSizesChanged) {
          this.setScrollBarDims();
          this.setScrollBarWrapperDims();
          this.setScrollData();
          this.handleScroll();

          this.dom.xWrapper.style.maxWidth = 'calc(100% - ' + this.dom.stickyColumn.offsetWidth + 'px';
          this.dom.yWrapper.style.height = 'calc(100% - ' + this.dom.stickyHeader.offsetHeight + 'px';

          this.oldWrapperSize = wrapperSize;
        }
      }
    }, {
      key: 'setScrollBarPaddings',
      value: function setScrollBarPaddings() {
        var scrollPadding = '0px 0px ' + this.xScrollSize + 'px 0px';
        this.dom.wrapper.style.padding = scrollPadding;

        var scrollPadding = '0px ' + this.yScrollSize + 'px 0px 0px';
        this.dom.xWrapper.firstChild.style.padding = scrollPadding;
      }
    }, {
      key: 'setScrollBarWrapperDims',
      value: function setScrollBarWrapperDims() {
        this.dom.yScrollbar.style.height = 'calc(100% - ' + this.dom.stickyHeader.offsetHeight + 'px)';
        this.dom.yScrollbar.style.top = this.dom.stickyHeader.offsetHeight + 'px';
      }
    }, {
      key: 'setScrollBarDims',
      value: function setScrollBarDims() {
        var width = this.getNodeSize(this.dom.bodyTable.firstChild).width + this.dom.stickyColumn.offsetWidth;
        this.dom.xScrollbar.firstChild.style.width = width + 'px';

        this.xScrollSize = this.dom.xScrollbar.offsetHeight - this.dom.xScrollbar.clientHeight;

        var height = this.dom.bodyTable.offsetHeight + this.dom.stickyHeader.offsetHeight;
        this.dom.yScrollbar.firstChild.style.height = height + 'px';

        this.yScrollSize = this.dom.yScrollbar.offsetWidth - this.dom.yScrollbar.clientWidth;

        if (!this.isFirefox) {
          this.setScrollBarPaddings();
        }

        if (this.xScrollSize) this.dom.xScrollbar.style.height = this.xScrollSize + 1 + 'px';
        if (this.yScrollSize) this.dom.yScrollbar.style.width = this.yScrollSize + 1 + 'px';
      }
    }, {
      key: 'setRowHeights',
      value: function setRowHeights() {
        var _this3 = this;

        var bodyRows, stickyHeaderRows, stickyCornerRows, stickyColumnRows, cells, columnHeight, resizeRow, row;

        if (this.rowCount > 0 && this.props.stickyColumnCount > 0) {
          bodyRows = this.dom.bodyTable.childNodes;
          stickyColumnRows = this.dom.stickyColumnTable.childNodes;

          stickyCornerRows = this.dom.stickyCornerTable.childNodes;
          stickyHeaderRows = this.dom.stickyHeaderTable.childNodes;

          resizeRow = function resizeRow(row) {
            cells = [];

            if (row < _this3.props.stickyHeaderCount) {
              //It's a sticky column
              cells[0] = stickyCornerRows[row].childNodes[0];
              cells[1] = stickyHeaderRows[row].childNodes[0];
            } else {
              //It's a body column
              cells[0] = stickyColumnRows[row - _this3.props.stickyHeaderCount].childNodes[0];
              cells[1] = bodyRows[row - _this3.props.stickyHeaderCount].childNodes[0];
            }

            cells.forEach(function (cell) {
              return cell.style.height = '';
            });

            columnHeight = Math.max(_this3.getNodeSize(cells[0]).height, _this3.getNodeSize(cells[1]).height);

            cells.forEach(function (cell) {
              return cell.style.height = Math.round(columnHeight) + 'px';
            });
          };

          for (row = 0; row < this.rowCount; row++) {
            setTimeout(resizeRow(row));
          }
        }
      }
    }, {
      key: 'setColumnWidths',
      value: function setColumnWidths() {
        var _this4 = this;

        var firstBodyRowCells, firstStickyHeaderRowCells, firstStickyCornerRowCells, firstStickyColumnRowCells, cells, resizeColumn, column;

        if (this.columnCount > 0 && this.props.stickyHeaderCount > 0) {
          firstBodyRowCells = this.dom.bodyTable.childNodes[0].childNodes;
          firstStickyHeaderRowCells = this.dom.stickyHeaderTable.childNodes[0].childNodes;

          firstStickyCornerRowCells = this.dom.stickyCornerTable.childNodes[0].childNodes;
          firstStickyColumnRowCells = this.dom.stickyColumnTable.childNodes[0].childNodes;

          resizeColumn = function resizeColumn(column) {
            cells = [];

            if (column < _this4.props.stickyColumnCount) {
              //It's a sticky column
              cells[0] = firstStickyColumnRowCells[column];
              cells[1] = firstStickyCornerRowCells[column];
            } else {
              //It's a body column
              cells[0] = firstBodyRowCells[column - _this4.props.stickyColumnCount];
              cells[1] = firstStickyHeaderRowCells[column - _this4.props.stickyColumnCount];
            }

            //IMPORTANT: minWidth is a necessary property here
            //because display: table-cell desparately wants to be dynamic/minimum in size
            cells.forEach(function (cell) {
              return cell.style.width = cell.style.minWidth = '';
            });

            var columnWidth = Math.max(_this4.getNodeSize(cells[0]).width, _this4.getNodeSize(cells[1]).width);

            cells.forEach(function (cell) {
              return cell.style.width = cell.style.minWidth = columnWidth + 'px';
            });
          };

          for (column = 0; column < this.columnCount; column++) {
            setTimeout(resizeColumn(column));
          }
        }
      }
    }, {
      key: 'getNodeSize',
      value: function getNodeSize(node) {
        return node.getBoundingClientRect();
      }
    }, {
      key: 'getStickyColumnRows',
      value: function getStickyColumnRows(rows) {
        var _this5 = this;

        return this.getRowSubset(rows, function (r) {
          return r >= _this5.props.stickyHeaderCount;
        }, function (c) {
          return c < _this5.props.stickyColumnCount;
        });
      }
    }, {
      key: 'getStickyHeaderRows',
      value: function getStickyHeaderRows(rows) {
        var _this6 = this;

        return this.getRowSubset(rows, function (r) {
          return r < _this6.props.stickyHeaderCount;
        }, function (c) {
          return c >= _this6.props.stickyColumnCount;
        });
      }
    }, {
      key: 'getStickyCornerRows',
      value: function getStickyCornerRows(rows) {
        var _this7 = this;

        return this.getRowSubset(rows, function (r) {
          return r < _this7.props.stickyHeaderCount;
        }, function (c) {
          return c < _this7.props.stickyColumnCount;
        });
      }
    }, {
      key: 'getBodyRows',
      value: function getBodyRows(rows) {
        var _this8 = this;

        return this.getRowSubset(rows, function (r) {
          return r >= _this8.props.stickyHeaderCount;
        }, function (c) {
          return c >= _this8.props.stickyColumnCount;
        });
      }
    }, {
      key: 'getRowSubset',
      value: function getRowSubset(rows, includeRow, includeColumn) {
        var stickyRows = [],
            cells,
            cellsSubset;

        rows.forEach(function (row, r) {
          if (includeRow(r)) {
            cells = _react2.default.Children.toArray(row.props.children);
            cellsSubset = [];

            cells.forEach(function (cell, c) {
              if (includeColumn(c)) {
                cellsSubset.push(cell);
              }
            });

            stickyRows.push(_react2.default.createElement(
              _Row2.default,
              _extends({}, row.props, { id: '', key: r }),
              cellsSubset
            ));
          }
        });

        return stickyRows;
      }
    }, {
      key: 'render',
      value: function render() {
        var _this9 = this;

        //This is probably sub-optimal because render only needs
        //to be called for react components that are sub-classed
        //and don't have props.children that are <Cell>s
        var rows = _react2.default.Children.toArray(this.props.children).map(function (row) {
          return new row.type(row.props).render(); // eslint-disable-line new-cap
        });

        var stickyCornerRows = this.getStickyCornerRows(rows);
        var stickyColumnRows = this.getStickyColumnRows(rows);
        var stickyHeaderRows = this.getStickyHeaderRows(rows);
        var bodyRows = this.getBodyRows(rows);

        this.rowCount = rows.length;
        this.columnCount = rows[0] && _react2.default.Children.toArray(rows[0].props.children).length || 0;

        var setWrapperElement = function setWrapperElement(element) {
          if (element) _this9.dom.wrapper = element;
        };

        return _react2.default.createElement(
          'div',
          { className: 'sticky-table ' + (this.props.className || ''), ref: setWrapperElement },
          _react2.default.createElement(
            'div',
            { className: 'x-scrollbar' },
            _react2.default.createElement('div', null)
          ),
          _react2.default.createElement(
            'div',
            { className: 'y-scrollbar' },
            _react2.default.createElement('div', null)
          ),
          _react2.default.createElement(
            'div',
            { className: 'sticky-table-header-wrapper' },
            _react2.default.createElement(
              'div',
              { className: ['sticky-table-corner', this.props.stickyHeaderCount && this.props.stickyColumnCount ? '' : 'hidden'].join(' ') },
              _react2.default.createElement(
                _Table2.default,
                null,
                stickyCornerRows
              )
            ),
            _react2.default.createElement(
              'div',
              { className: ['sticky-table-header', this.props.stickyHeaderCount ? '' : 'hidden'].join(' ') },
              _react2.default.createElement(
                _Table2.default,
                null,
                stickyHeaderRows
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'sticky-table-y-wrapper' },
            _react2.default.createElement(
              'div',
              { className: ['sticky-table-column', this.props.stickyColumnCount ? '' : 'hidden'].join(' ') },
              _react2.default.createElement(
                _Table2.default,
                null,
                stickyColumnRows
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'sticky-table-x-wrapper' },
              _react2.default.createElement(
                _Table2.default,
                null,
                bodyRows
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
    stickyColumnCount: _propTypes2.default.number,
    onScroll: _propTypes2.default.func
  };
  StickyTable.defaultProps = {
    stickyHeaderCount: 1,
    stickyColumnCount: 1
  };
  exports.StickyTable = StickyTable;
  exports.Table = _Table2.default;
  exports.Row = _Row2.default;
  exports.Cell = _Cell2.default;
});
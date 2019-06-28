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

  var index = 0;

  /**
   * StickyTable Component
   * Responsive, dynamically sized fixed headers and columns for tables
   * ------------------------------------------------------------------
   * Intentionally not setting state because we don't want to require
   * a full re-render every time the user scrolls or changes the
   * width of a cell.
   */

  var StickyTable = function (_PureComponent) {
    _inherits(StickyTable, _PureComponent);

    function StickyTable(props) {
      _classCallCheck(this, StickyTable);

      var _this = _possibleConstructorReturn(this, (StickyTable.__proto__ || Object.getPrototypeOf(StickyTable)).call(this, props));

      _this.index = index = index + 1;
      return _this;
    }

    /**
     * Get the column and header to render
     * @returns {undefined}
     */


    _createClass(StickyTable, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            stickyColumnCount = _props.stickyColumnCount,
            stickyHeaderCount = _props.stickyHeaderCount;


        stickyColumnCount = Math.min(stickyColumnCount, 1);
        stickyHeaderCount = Math.min(stickyHeaderCount, 1);

        return _react2.default.createElement(
          'div',
          { className: 'sticky-table sticky-table-' + this.index + (this.props.className || ''), onScroll: function onScroll(e) {
              var target = e.nativeEvent.target;

              if (_this2.props.onScroll) {
                _this2.props.onScroll({
                  scrollTop: target.scrollTop,
                  scrollHeight: target.scrollHeight,
                  clientHeight: target.clientHeight,
                  scrollLeft: target.scrollLeft,
                  scrollWidth: target.scrollWidth,
                  clientWidth: target.clientWidth
                });
              }
            } },
          _react2.default.createElement(
            'style',
            null,
            '\n            .sticky-table-' + this.index + ' .sticky-table-row:nth-child(-n+' + stickyHeaderCount + ') .sticky-table-cell {\n              position: -webkit-sticky;\n              position: sticky;\n              top: 0;\n              z-index: 2;\n            }\n            .sticky-table-' + this.index + ' .sticky-table-row .sticky-table-cell:nth-child(-n+' + stickyColumnCount + ') {\n              position: -webkit-sticky;\n              position: sticky;\n              left: 0;\n              z-index: 2;\n            }\n            .sticky-table-' + this.index + ' .sticky-table-row:nth-child(-n+' + stickyHeaderCount + ') .sticky-table-cell:nth-child(-n+' + stickyColumnCount + ') {\n              position: -webkit-sticky;\n              position: sticky;\n              top: 0;\n              left: 0;\n              z-index: 3;\n            }\n          '
          ),
          _react2.default.createElement(
            _Table2.default,
            null,
            this.props.children
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
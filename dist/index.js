#!/usr/bin/env babel-node
'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _graphql = require('graphql');

var _utilities = require('graphql/utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.arguments('<file>').option('-E, --Entry <entry>', 'Entry point into the schema. Dependent on whether Schema was expoerted as deault or something else.').option('-P, --Print', 'Print the schema instead of outputting to a file').parse(process.argv);

var fileLocation = _commander2.default.args[0];
var schmeaLocation = _path2.default.join(process.cwd(), fileLocation);
var schema = require(schmeaLocation);

schema = _commander2.default.Entry ? schema[_commander2.default.Entry] : schema.default;

if (_commander2.default.Print) {
  (0, _asyncToGenerator3.default)(regeneratorRuntime.mark(function _callee() {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('Readable Schema for: ' + schmeaLocation + '\n');
            _context.next = 3;
            return (0, _utilities.printSchema)(schema);

          case 3:
            result = _context.sent;


            console.log(result);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }))();
} else {
  (0, _asyncToGenerator3.default)(regeneratorRuntime.mark(function _callee2() {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _graphql.graphql)(schema, _utilities.introspectionQuery);

          case 2:
            result = _context2.sent;


            if (result.errors) {
              console.error('ERROR Introspecting Schema');
              console.error((0, _stringify2.default)(result, null, 2));
            } else {
              _fs2.default.writeFileSync(_path2.default.join(process.cwd(), 'schema.json'), (0, _stringify2.default)(result, null, 2));
              console.log('SUCCESS!!!');
              console.log('Wrote the Schema to: ' + _path2.default.join(process.cwd(), 'schema.json'));
            }

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }))();
}
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.createTable('Users', {
                id: {
                  type: Sequelize.INTEGER,
                  autoIncrement: true,
                  allowNull: false,
                  primaryKey: true,
                  onDelete: 'CASCADE',
                  hooks: true
                },
                profile: {
                  type: Sequelize.STRING
                },
                establishmentId: {
                  type: Sequelize.INTEGER
                },
                firstName: {
                  type: Sequelize.STRING
                },
                lastName: {
                  type: Sequelize.STRING
                },
                birth: {
                  type: Sequelize.STRING
                },
                email: {
                  type: Sequelize.STRING
                },
                phone: {
                  type: Sequelize.STRING
                },
                status: {
                  type: Sequelize.STRING
                },
                password: {
                  type: Sequelize.STRING
                },
                createdAt: {
                  type: Sequelize.DATE,
                  allowNull: false,
                  defaultValue: Sequelize.NOW
                },
                updatedAt: {
                  type: Sequelize.DATE,
                  allowNull: false,
                  defaultValue: Sequelize.NOW
                }
              });

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function up(_x, _x2) {
      return _up.apply(this, arguments);
    }

    return up;
  }(),
  down: function () {
    var _down = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(queryInterface, Sequelize) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return queryInterface.dropTable('Users');

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function down(_x3, _x4) {
      return _down.apply(this, arguments);
    }

    return down;
  }()
};
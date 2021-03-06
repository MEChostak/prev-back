"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _User = _interopRequireDefault(require("../models/User"));

var _Organization = _interopRequireDefault(require("../models/Organization"));

var _ValidatorUser = _interopRequireDefault(require("../services/ValidatorUser"));

var Sequelize = require('sequelize');

var jwt = require('jsonwebtoken');

var Op = Sequelize.Op;
module.exports = {
  store: function store(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var obj, errorDetails, register, user;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              obj = {
                name: req.body.name,
                password: req.body.password,
                mail: req.body.mail,
                personId: req.body.personId,
                organizationId: req.body.organizationId,
                organization: []
              }; // Valida o objeto

              _context.next = 3;
              return _ValidatorUser["default"].user(obj);

            case 3:
              errorDetails = _context.sent;

              if (!(errorDetails != 0)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: "Malformed object.",
                fields: errorDetails
              }));

            case 6:
              _context.next = 8;
              return _User["default"].findAll({
                limit: 1,
                where: {
                  mail: obj.mail
                }
              });

            case 8:
              register = _context.sent;

              if (!(register.length > 0)) {
                _context.next = 11;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: "User already registered.",
                fields: [obj.name]
              }));

            case 11:
              if (obj.organizationId) {
                _context.next = 17;
                break;
              }

              _context.next = 14;
              return _User["default"].create(obj, {
                include: [{
                  association: 'organization'
                }]
              });

            case 14:
              user = _context.sent;
              _context.next = 20;
              break;

            case 17:
              _context.next = 19;
              return _User["default"].create(obj);

            case 19:
              user = _context.sent;

            case 20:
              if (user) {
                _context.next = 24;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Fail to create User!"
              }));

            case 24:
              return _context.abrupt("return", res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: "User created!",
                data: user
              }));

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  update: function update(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var userId, obj, errorDetails, user, organization;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              userId = req.params.userId;
              obj = {
                name: req.body.name,
                password: req.body.password,
                mail: req.body.mail,
                personId: req.body.personId,
                organizationId: req.body.organizationId
              }; // Valida o objeto

              _context2.next = 4;
              return _ValidatorUser["default"].userUpdate(obj);

            case 4:
              errorDetails = _context2.sent;

              if (!(errorDetails != 0)) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: "Malformed object.",
                fields: errorDetails
              }));

            case 7:
              _context2.next = 9;
              return _User["default"].findByPk(userId);

            case 9:
              user = _context2.sent;

              if (user) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "User not found!"
              }));

            case 12:
              _context2.next = 14;
              return _Organization["default"].findByPk(obj.organizationId);

            case 14:
              organization = _context2.sent;

              if (organization) {
                _context2.next = 17;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Organization not found!"
              }));

            case 17:
              // Altera o user
              _User["default"].update(obj, {
                where: {
                  id: userId
                }
              }).then(function (result) {
                console.log(result);
                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: "User updated!"
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Failed to update user!"
                });
              });

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  show: function show(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var userId;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              userId = req.params.userId; // Pesquisar o usu??rio

              _User["default"].findByPk(userId // inclui na pesquisa todos os itens relacionados
              // {
              //     include: [
              //         { association: 'profile' },
              //         { association: 'organization' },
              //     ]
              // }
              ).then(function (user) {
                console.log(user);

                if (!user) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "User not found!"
                  });
                }

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: "",
                  data: user
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Failed to find user!"
                });
              });

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  list: function list(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var page, obj, Op, whereClause;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              page = req.params.page;
              obj = {
                name: req.body.name,
                mail: req.body.mail,
                organizationId: req.body.organizationId,
                status: req.body.status,
                personId: req.body.personId
              };
              Op = Sequelize.Op;
              whereClause = new Object();

              if (obj.name) {
                whereClause.name = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.name + '%');
              }

              if (obj.organizationId) {
                whereClause.organizationId = obj.organizationId;
              }

              console.log(obj);
              console.log("console log aqui", process.env.PER_PAGE);

              _User["default"].findAndCountAll({
                where: whereClause,

                /* include: [
                    { association: 'profile' },
                    { association: 'organization' },
                ], */
                limit: parseInt(process.env.PER_PAGE),
                offset: (page - 1) * parseInt(process.env.PER_PAGE),
                order: [['id', 'DESC']]
              }).then(function (user) {
                var response = {
                  timestamp: Date.now(),
                  ok: true,
                  info: {
                    totalRows: user.count,
                    totalPages: Math.ceil(user.count / parseInt(process.env.PER_PAGE)),
                    page: page
                  },
                  elements: user.rows
                };
                return res.status(200).json(response);
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Failed to list user!"
                });
              });

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  "delete": function _delete(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var userId, user;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              userId = req.params.userId; // Verifica se o user existe

              _context5.next = 3;
              return _User["default"].findByPk(userId);

            case 3:
              user = _context5.sent;

              if (user) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "User not found!"
              }));

            case 6:
              // Deleta o user
              _User["default"].destroy({
                where: {
                  id: userId
                }
              }).then(function (result) {
                console.log(result);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "User deleted!"
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Failed to delete user!"
                });
              });

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  },
  login: function login(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var obj;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              obj = {
                mail: req.body.mail,
                password: req.body.password
              };

              _User["default"].findOne({
                where: obj
              }).then(function (user) {
                console.log(user);

                if (!user) {
                  return res.status(200).send({
                    ok: false,
                    message: 'Usu??rio n??o cadastrado com o login informado'
                  });
                }

                console.log("teste", user);
                var _user = {
                  id: user.id,
                  name: user.name,
                  mail: user.mail,
                  organizationId: user.organizationId
                };
                console.log("user", _user);
                var token = jwt.sign(_user, process.env.SECRETTOKEN, {
                  expiresIn: eval(process.env.TIMEOUT)
                });
                console.log(token);
                return res.status(200).send({
                  ok: true,
                  message: 'Usu??rio autenticado com sucesso',
                  token: token,
                  id: user.id,
                  name: user.name
                });
              })["catch"](function (err) {
                console.log(err.message);
                return res.status(400).send({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Failed to find user"
                });
              });

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  }
};
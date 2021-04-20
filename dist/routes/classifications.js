"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var express = require('express');

var router = express.Router();

var Classification = require('../models/Classification');

router.get('/classifications/add', function (req, res) {
  res.render('classifications/new-classification');
});
router.post('/classifications/new-classification', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, code, description, errors, newClassification;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, code = _req$body.code, description = _req$body.description;
            errors = [];

            if (!code) {
              errors.push({
                text: 'Please type the code for this classification'
              });
            }

            if (!description) {
              errors.push({
                text: 'Please type the description for this classification'
              });
            }

            if (!(errors.length > 0)) {
              _context.next = 8;
              break;
            }

            res.render('classification/new-classification', {
              errors: errors,
              code: code,
              description: description
            });
            _context.next = 13;
            break;

          case 8:
            newClassification = new Classification({
              code: code,
              description: description
            });
            _context.next = 11;
            return newClassification.save();

          case 11:
            req.flash('success_msg', 'The new classification was successfully saved');
            res.redirect('/classifications');

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get('/classifications', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var classifications;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Classification.find().lean();

          case 2:
            classifications = _context2.sent;
            res.render('classifications/all-classifications', {
              classifications: classifications
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.get('/classifications/edit/:id', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _yield$Classification, _id, code, description;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return Classification.findById(req.params.id).lean();

          case 2:
            _yield$Classification = _context3.sent;
            _id = _yield$Classification._id;
            code = _yield$Classification.code;
            description = _yield$Classification.description;
            res.render('classifications/edit-classification', {
              _id: _id,
              code: code,
              description: description
            });

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.put('/classifications/edit-classification/:id', /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body2, code, description;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, code = _req$body2.code, description = _req$body2.description;
            _context4.next = 3;
            return Classification.findByIdAndUpdate(req.params.id, {
              code: code,
              description: description
            }, {
              useFindAndModify: false
            });

          case 3:
            req.flash('success_msg', 'The classification information was successfully changed');
            res.redirect('/classifications');

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router["delete"]('/classifications/delete/:id', /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return Classification.findByIdAndDelete(req.params.id, {
              useFindAndModify: false
            });

          case 2:
            req.flash('success_msg', 'The classification was successfully deleted');
            res.redirect('/classifications');

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
module.exports = router;
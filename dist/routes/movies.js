"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var express = require('express');

var router = express.Router();

var Movie = require('../models/Movie');

var Classification = require('../models/Classification');

router.get('/movies/add', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var classifications;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Classification.find().lean();

          case 2:
            classifications = _context.sent;
            res.render('movies/new-movie', {
              classifications: classifications
            });

          case 4:
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
router.post('/movies/new-movie', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, name, director, classification, classifications, errors, newMovie;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, director = _req$body.director, classification = _req$body.classification;
            _context2.next = 3;
            return Classification.find().lean();

          case 3:
            classifications = _context2.sent;
            errors = [];

            if (!name) {
              errors.push({
                text: 'Please type the name of the movie'
              });
            }

            if (!director) {
              errors.push({
                text: 'Please type the director\'s name'
              });
            }

            if (!classification) {
              errors.push({
                text: 'Please choose a classification for the movie'
              });
            }

            if (!(errors.length > 0)) {
              _context2.next = 12;
              break;
            }

            res.render('movies/new-movie', {
              errors: errors,
              name: name,
              director: director,
              classification: classification,
              classifications: classifications
            });
            _context2.next = 17;
            break;

          case 12:
            newMovie = new Movie({
              name: name,
              director: director,
              classification: classification
            });
            _context2.next = 15;
            return newMovie.save();

          case 15:
            req.flash('success_msg', 'The movie was successfully saved');
            res.redirect('/movies');

          case 17:
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
router.get('/movies', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var movies;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return Movie.find().lean();

          case 2:
            movies = _context3.sent;
            res.render('movies/all-movies', {
              movies: movies
            });

          case 4:
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
router.get('/movies/edit/:id', /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var movie, classifications;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return Movie.findById(req.params.id).lean();

          case 2:
            movie = _context4.sent;
            _context4.next = 5;
            return Classification.find().lean();

          case 5:
            classifications = _context4.sent;
            res.render('movies/edit-movie', {
              movie: movie,
              classifications: classifications
            });

          case 7:
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
router.put('/movies/edit-movie/:id', /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$body2, name, director, classification;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, director = _req$body2.director, classification = _req$body2.classification;
            _context5.next = 3;
            return Movie.findByIdAndUpdate(req.params.id, {
              name: name,
              director: director,
              classification: classification
            }, {
              useFindAndModify: false
            });

          case 3:
            req.flash('success_msg', 'The movie information was successfully changed');
            res.redirect('/movies');

          case 5:
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
router["delete"]('/movies/delete/:id', /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return Movie.findByIdAndDelete(req.params.id, {
              useFindAndModify: false
            });

          case 2:
            req.flash('success_msg', 'The movie was successfully deleted');
            res.redirect('/movies');

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
module.exports = router;
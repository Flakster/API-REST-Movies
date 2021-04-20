"use strict";

var _mongoose = require("mongoose");

var dbURI = 'mongodb+srv://testuser:Pbepass1.1@cluster0.yqs2u.mongodb.net/moviesdb?retryWrites=true&w=majority';
(0, _mongoose.connect)(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function (db) {
  return console.log('Database succesfully connected');
})["catch"](function (err) {
  return console.log(err);
});
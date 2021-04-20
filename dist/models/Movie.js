"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var MovieSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  classification: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('Movie', MovieSchema);
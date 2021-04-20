"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ClassificationSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('Classification', ClassificationSchema);
const mongoose = require('mongoose');
const { Schema } = mongoose; 

const MovieSchema = new Schema({
  name: {type: String, required: true},
  director: { type: String, required: true},
  classification: { type: String, required: true}
});

module.exports = mongoose.model('Movie', MovieSchema);
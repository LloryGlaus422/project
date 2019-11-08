const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

//Define a schema
var Schema = mongoose.Schema;


var Shop = new Schema({
  item: {
    type: String,
    required: true,
    unique: [true,"item must be unique"]
  },
  quantity: {
    type: Number,
    min: 1,
    required: true
  },
  price: {
    type: Number,
    min: 1,
    required: true
  },
  priority: {
    type: Number,
    min: 1,
    max: 3,
    required: true
  }
});
Shop.plugin(uniqueValidator, { message: '{item} must be unique' });

// Compile model from schema
module.exports = mongoose.model('Item', Shop);
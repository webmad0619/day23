const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaName = new Schema({
  name: String,
  occupation: String,
  weapon: String,
  debt: Number
});

const Model = mongoose.model('Character', schemaName);
module.exports = Model;
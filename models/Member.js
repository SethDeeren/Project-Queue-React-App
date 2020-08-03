const mongoose = require('mongoose');
const { Schema } = mongoose;

const memberSchema = new Schema({
  name: String,
  notes: String,
});

module.exports = memberSchema;

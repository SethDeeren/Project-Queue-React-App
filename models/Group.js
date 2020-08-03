const mongoose = require('mongoose');
const { Schema } = mongoose;
const MemberSchema = require('./Member');
const memberSchema = require('./Member');

const groupSchema = new Schema({
  members: [memberSchema],
  notes: String,
});

module.exports = groupSchema;

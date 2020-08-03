const mongoose = require('mongoose');
const GroupSchema = require('./Group');
const { Schema } = mongoose;

const projectSchema = new Schema({
  title: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    username: String,
  },
  groups: [GroupSchema],
  dateCreated: { type: Date, default: Date.now() },
});

mongoose.model('Project', projectSchema);

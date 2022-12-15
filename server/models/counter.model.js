const mongoose = require('mongoose');

const { Schema } = mongoose;

const counterSchema = new Schema({
  name: {
    type: String,
  },
  count: {
    type: Number,
  },
});

const Counter = mongoose.model('Counter', counterSchema);
module.exports = Counter;

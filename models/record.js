const mongoose = require('mongoose')

const recordSchema = new mongoose.Schema({
  laptime: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  carId: {
    type: Number,
    required: true
  },
  trackId: {
    type: Number,
    required: true
  },
  date: Date,
  confId: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Record', recordSchema)
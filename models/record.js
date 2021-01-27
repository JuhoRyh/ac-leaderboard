const mongoose = require('mongoose')

const recordSchema = new mongoose.Schema({
  laptime: Number,
  username: String,
  carId: Number,
  trackId: Number,
  date: Date,
  confId: Number
})

module.exports = mongoose.model('Record', recordSchema)
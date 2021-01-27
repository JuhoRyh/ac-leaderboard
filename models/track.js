const mongoose = require('mongoose')

const trackSchema = new mongoose.Schema({
  trackId: Number,
  country: String,
  desc: String,
  configuration: Array
})

module.exports = mongoose.model('Track', trackSchema)


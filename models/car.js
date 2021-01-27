const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
  brand: String,
  carId: Number,
  name: String,
  year: Number,
  class: String
})

module.exports = mongoose.model('Car', carSchema)
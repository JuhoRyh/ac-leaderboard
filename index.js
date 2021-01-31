require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT
const Car =  require('./models/car')
const Track = require('./models/track')
const Record = require('./models/record')
const mongoose = require('mongoose')
const url = process.env.MONGODB_URL

app.use(cors())

app.use(express.json())

app.use(express.static('public'))

console.log('connecting to db')

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }).then(res => {
  console.log('Connected to db')
}).catch(error => {
  console.log(`error in connecting: ${error.message}`)
})

app.get('/', (req,res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/api/cars/:carId', (req,res) => {
  const carId = req.params.carId
  Car.find({carId: carId}).then(car => res.json(car))
})

app.get('/api/cars', (req,res) => {
  Car.find({}).then(cars => {
    res.json(cars)
  })
})

app.get('/api/tracks/:trackId', (req,res) => {
  const trackId = req.params.trackId
  Track.find({trackId: trackId}).then(track => res.json(track))
})

app.get('/api/tracks', (req,res)=> {
  Track.find({}).then(tracks => {
    res.json(tracks) 
  })
})

app.post('/api/records', (req,res) => {
  const body = req.body

  console.log(req.body)
  
  if(body.laptime === undefined){
    return res.status(400).json({error: 'Info missing'})
  }

  const record = new Record({
    laptime: body.laptime,
    username: body.username,
    carId: body.carId,
    trackId: body.trackId,
    date: new Date(),
    confId: body.confId
  })

  record.save().then(savedRecord => {
    res.json(savedRecord)
  })
})

app.get('/api/records/:trackId', (req,res) => {
  const trackId = req.params.trackId
  Record.find({trackId: trackId}).then(records => {
    records.sort((a,b) => {
      return a.laptime - b.laptime
    })
    res.json(records)
  })
})


app.listen(PORT || 3001, () => {
  console.log('server running')
})
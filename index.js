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
const path = require('path')

app.use(cors())

app.use(express.json())

//Allowing to get photos from the public folder
app.use(express.static('public'))

//Makes the frontend work on '/'
app.use(express.static(path.join(__dirname, 'build')))


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }).then(res => {
  console.log('Connected to db')
}).catch(error => {
  console.log(`error in connecting: ${error.message}`)
})

//Sends info of a car
app.get('/api/cars/:carId', (req,res) => {
  const carId = req.params.carId
  Car.find({carId: carId}).then(car => res.json(car))
})

//Sends all the cars
app.get('/api/cars', (req,res) => {
  Car.find({}).then(cars => {
    res.json(cars)
  })
})

//Sends info of a track
app.get('/api/tracks/:trackId', (req,res) => {
  const trackId = req.params.trackId
  Track.find({trackId: trackId}).then(track => res.json(track))
})

//Sends all the track
app.get('/api/tracks', (req,res)=> {
  Track.find({}).then(tracks => {
    res.json(tracks) 
  })
})

//Saves a record to the database
app.post('/api/records', (req,res) => {
  const body = req.body
  
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
    res.json(savedRecord.toJSON())
  }).catch()
})

//Sends all the records of an specific track
app.get('/api/records/:trackId', (req,res) => {
  const trackId = req.params.trackId
  Record.find({trackId: trackId}).then(records => {
    records.sort((a,b) => {
      return a.laptime - b.laptime
    })
    res.json(records)
  })
})

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname+'/build/index.html'))
})


app.listen(PORT || 3001, () => {
  console.log('server running')
})
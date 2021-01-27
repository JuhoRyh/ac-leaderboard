import React, {useState} from 'react'
import axios from 'axios'

const AddRecord = (props) => {
  const [car, setCar] = useState()
  const [track, setTrack] = useState()
  const [conf, setConf] = useState()
  const [brand, setBrand] = useState()
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [mSeconds, setMSeconds] = useState(0)
  const [username, setUsername] = useState('')

  const getBrands = (cars) => {
    var brands = []
    cars.map(car => {
      if(!brands.includes(car.brand)){
        brands.push(car.brand)
      }
    })
    return brands
  }

  const trackHandler = (event) => {
    const newTrack = props.tracks.find(track => track.trackId === parseInt(event.target.value))
    setTrack(newTrack)
  }

  const carHandler = (event) => {
    setCar(event.target.value)
  }

  const confHandler = (event) => {
    setConf(event.target.value)
  }

  const brandHandler = (event) => {
    const chosenBrand = props.cars.filter(car => car.brand == event.target.value)
    setBrand(chosenBrand)
  }
  
  const minuteHandler = (event) => {
    setMinutes(event.target.value)
  }

  const secondHandler = (event) => {
    setSeconds(event.target.value)
  }

  const msHandler = (event) => {
    setMSeconds(event.target.value)
  }

  const usernameHandler = (event) => {
    setUsername(event.target.value)
  }

  const submitHandler = (event) => {
    event.preventDefault()
    const laptime = parseInt(minutes) * 60000 + parseInt(seconds) * 1000 + parseInt(mSeconds)
    const recordObject = {
      username: username,
      carId: parseInt(car),
      trackId: track.trackId,
      confId: parseInt(conf),
      laptime: laptime
    }

    axios.post('http://localhost:3001/api/records', recordObject)
    
    setSeconds(0)
    setMSeconds(0)
    setMinutes(0)
    setUsername('')
  } 

  

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label>
            Track:
            <select onChange={trackHandler}>
              <option></option>
              {props.tracks.map(track => {return <option key={track.trackId} value={track.trackId}>{track.name}</option>})}
            </select>
          </label>
          <label>
            Layout:
            <select onChange={confHandler}>
              <option></option>
              {track === undefined ? null : track.configuration.map(conf => {return <option key ={conf.confId} value={conf.confId}>{conf.layout}</option>})}
            </select>
          </label>
        </div>
        <div>
          <label>
            Brand:
            <select onChange={brandHandler}>
              <option></option>
              {getBrands(props.cars).map(brand => {return <option key={brand} value={brand}>{brand}</option>})}
            </select>
          </label>
          <label>
            Model:
            <select onChange={carHandler}>
              <option></option>
              {brand === undefined ? null : brand.map(model => {return <option key={model.carId} value={model.carId}>{model.name}</option>})}
            </select>
          </label>
        </div>
        <div>
          <label>
            Minutes:
            <input type="number" value={minutes} onChange={minuteHandler} />
          </label>
          <label>
            Seconds:
            <input type="number" value={seconds} onChange={secondHandler} />
          </label>
          <label>
            Milliseconds:
            <input type="number" value={mSeconds} onChange={msHandler} />
          </label>
        </div>
        <div>
          <label>
            Username:
            <input type="text" value={username} onChange={usernameHandler} />
          </label>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddRecord
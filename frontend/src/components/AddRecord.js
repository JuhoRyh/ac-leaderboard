import React, {useState} from 'react'
import axios from 'axios'

const AddRecord = (props) => {
  const [car, setCar] = useState()
  const [track, setTrack] = useState()
  const [conf, setConf] = useState()
  const [brand, setBrand] = useState()
  const [minutes, setMinutes] = useState()
  const [seconds, setSeconds] = useState()
  const [mSeconds, setMSeconds] = useState()
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

    axios.post('/api/records', recordObject)
    
    setSeconds(0)
    setMSeconds(0)
    setMinutes(0)
    setUsername('')
  } 

  

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={submitHandler} className="bg-gray-300 p-6 mb-6 rounded-lg">
        <div className="grid grid-cols-2">
          <label>
            Track:
            <br />
            <select className="w-full mb-4" onChange={trackHandler}>
              <option></option>
              {props.tracks.map(track => {return <option key={track.trackId} value={track.trackId}>{track.name}</option>})}
            </select>
          </label>
          <label>
            Layout:
            <br />
            <select className="w-full" onChange={confHandler}>
              <option></option>
              {track === undefined || track === null ? null : track.configuration.map(conf => {return <option key ={conf.confId} value={conf.confId}>{conf.layout}</option>})}
            </select>
          </label>
        </div>
        <div className="grid grid-cols-2">
          <label>
            Brand:
            <br />
            <select className="w-full" onChange={brandHandler}>
              <option></option>
              {getBrands(props.cars).map(brand => {return <option key={brand} value={brand}>{brand}</option>})}
            </select>
          </label>
          <label>
            Model:
            <br />
            <select className="w-full mb-4" onChange={carHandler}>
              <option></option>
              {brand === undefined || brand === null ? null : brand.map(model => {return <option key={model.carId} value={model.carId}>{model.name}</option>})}
            </select>
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 mb-4 justify-items-between">
          <div className="m-4">
          <label>
            Minutes:
            <br/>
            <input type="text" value={minutes} onChange={minuteHandler} />
          </label>
          </div>
          <div className="m-4">
          <label>
            Seconds:
            <br/>
            <input type="text" value={seconds} onChange={secondHandler} />
          </label>
          </div>
          <div className="m-4">          
          <label>
            Milliseconds:
            <br />
            <input type="text" value={mSeconds} onChange={msHandler} />
          </label>
          </div>
        </div>
        <div className="ml-24 mr-24 mb-4">
          <label>
            Username:
            <br />
            <input className="w-full" type="text" value={username} onChange={usernameHandler} />
          </label>
        </div>
        <div className="grid grid-cols-1">
          <button className="h-12 px-6 m-2 text-lg text-blue-100 bg-blue-600 rounded-lg hover:bg-blue-700" type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddRecord
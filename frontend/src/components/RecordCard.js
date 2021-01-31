import axios from 'axios'
import React, {useState, useEffect} from 'react'

const RecordCard = (props) => {
  const [car, setCar] = useState()
  
  useEffect(() => {
    axios.get(`/api/cars/${props.record.carId}`).then(res => {
      setCar(res.data[0])})
  },[])

  const getLapTime = (ms) => {
    var minutes = Math.floor(ms/60000)
    var seconds = ((ms % 60000) / 1000).toFixed(0)
    var milliseconds = ms % 1000
    return minutes + ":" + seconds + "." + milliseconds
  }

  if(car !== undefined){
    return(
      <div className="w-screen md:w-1/2 flex flex-row justify-between shadow-xl">
        <div className="m-auto">
          <p className="text-xl text-left">{props.record.username}</p>
          <h4 className="text-3xl text-left">{getLapTime(props.record.laptime)}</h4>
          <p>{car.brand} {car.name}</p>
          
        </div>
        <div>
          <img width="355" src={`/images/cars/${car.carId}.jpg`} />
        </div>
      </div>
    )
  }else{
    return(<div></div>)
  }
}

export default RecordCard
import axios from 'axios'
import React, {useState, useEffect} from 'react'

const RecordCard = (props) => {
  const [car, setCar] = useState()
  
  useEffect(() => {
    axios.get(`http://localhost:3001/api/cars/${props.record.carId}`).then(res => {
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
      <div>
        <div>
          <p>{props.record.username}</p>
          <p>{car.brand} {car.name}</p>
          <h4>{getLapTime(props.record.laptime)}</h4>
        </div>
        <div>
          <img src={`http://localhost:3001/images/cars/${car.carId}.jpg`} />
        </div>
      </div>
    )
  }else{
    return(<div></div>)
  }
}

export default RecordCard
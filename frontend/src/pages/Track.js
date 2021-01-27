import { useParams } from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import RecordCard from '../components/RecordCard'

const Track = () => {
  const {trackId} = useParams() 
  const [records, setRecords] = useState([])
  const [track, setTrack] = useState()
  
  useEffect(() => {
    axios.all([axios.get(`http://localhost:3001/api/tracks/${trackId}`), axios.get(`http://localhost:3001/api/records/${trackId}`)]).then(axios.spread((firstRes, secondRes) => {
      setTrack(firstRes.data[0])
      console.log(firstRes.data)
      setRecords(secondRes.data)
    }))
  },[])

  if(track !== undefined){
    return(
    <div>
       <div>
         <h2>{track.name}</h2>
         <p>{track.desc}</p>
         <img src={`http://localhost:3001/images/tracks/${track.trackId}.png`} />
       </div>
       {records.length > 0 ? records.map(record => {return <RecordCard key={record._id} record={record} />}) : <p>No Records yet</p>}
    </div>
  )
    }else{
      return(<div></div>)
    }
}

export default Track
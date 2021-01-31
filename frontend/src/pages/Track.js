import { useParams } from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import RecordCard from '../components/RecordCard'

const Track = () => {
  const {trackId} = useParams() 
  const [records, setRecords] = useState([])
  const [track, setTrack] = useState()
  const [conf, setConf] = useState(1)
  
  useEffect(() => {
    axios.all([axios.get(`/api/tracks/${trackId}`), axios.get(`/api/records/${trackId}`)]).then(axios.spread((firstRes, secondRes) => {
      setTrack(firstRes.data[0])
      console.log(firstRes.data)
      setRecords(secondRes.data)
    }))
  },[])

  const clickHandler = (confId) => {
    setConf(confId)
  }

  console.log(conf)

  if(track !== undefined){
    return(
    <div className="flex flex-col items-center">
       <div className="w-screen md:w-1/2 flex flex-row justify-between border-2">
         <div className="m-auto">
           <h2 className="text-3xl text-center">{track.name}</h2>
           <p className="text-center">{track.desc}</p>
          </div>
          <img width="355" className="float-right" src={`/images/tracks/${track.trackId}.png`} />
        </div>
        <div className="flex">
        {track.configuration.map(conf => <button className="p-4 bg-blue-300 m-2 rounded-lg hover:bg-blue-500" onClick={() => clickHandler(conf.confId)}>{conf.layout}</button>)}
        </div>
       {records.length > 0 ? records.filter(record => record.confId === conf).map(record => {return <RecordCard key={record._id} record={record} />}) : <p>No Records yet</p>}
    </div>
  )
    }else{
      return(<div></div>)
    }
}

export default Track
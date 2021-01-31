import axios from 'axios'
import React, { useState, useEffect } from 'react'
import AddRecord from '../components/AddRecord'
import LeaderBoards from '../components/Leaderboards'

const Home = () => {
  const [cars, setCars] = useState([])
  const [tracks, setTracks] = useState([])

  useEffect(() => {
    axios.all([axios.get('/api/tracks'), axios.get('/api/cars')]).then(axios.spread((firstRes, secondRes) => {
      setTracks(firstRes.data)
      setCars(secondRes.data)
    }))
  }, [])

  if (tracks.length > 1 && cars.length > 1) {
    return (
      <div>
        <div>
          <AddRecord cars={cars} tracks={tracks} />
          <LeaderBoards tracks={tracks} />
        </div>
      </div>
    )
  }
  else {
    return (<div></div>)
  }
}

export default Home
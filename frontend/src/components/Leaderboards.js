import React from 'react'
import TrackCard from '../components/TrackCard'

const Leaderboard = (props) => {
  return(
    <div>
      <h3>Leaderboards</h3>
      {props.tracks.map(track => {
        return <TrackCard key={track.trackId} track={track} />
      })}
    </div>
  )
}

export default Leaderboard
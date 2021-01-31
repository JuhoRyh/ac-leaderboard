import React from 'react'
import TrackCard from '../components/TrackCard'

const Leaderboard = (props) => {
  return(
    <div className="flex flex-col items-center">
      <h3 className="text-5xl">Leaderboards</h3>
      <div className="grid grid-cols-2 md:grid-cols-3">
      {props.tracks.map(track => {
        return <TrackCard key={track.trackId} track={track} />
      })}
      </div>
    </div>
  )
}

export default Leaderboard
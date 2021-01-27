import React from 'react'

const TrackCard = (props) => {

  return(
    <a href={`/track/${props.track.trackId}`}>
    <div>
      <img src={`http://localhost:3001/images/tracks/${props.track.trackId}.png`} />
      <h2>{props.track.name}</h2>
      <h4>{props.track.desc}</h4>
    </div>
    </a>
  )
}

export default TrackCard
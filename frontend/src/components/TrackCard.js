import React from 'react'

const TrackCard = (props) => {

  return(
    <div className="shadow-lg p-4">
      <a href={`/track/${props.track.trackId}`}>
      <div>
        <img src={`/images/tracks/${props.track.trackId}.png`} />
        <h2 className="text-2xl">{props.track.name}</h2>
        <h4 className="text-sm">{props.track.desc}</h4>
      </div>
      </a>
    </div>
  )
}

export default TrackCard
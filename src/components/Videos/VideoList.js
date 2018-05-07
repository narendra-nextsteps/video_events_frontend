import React from 'react'

const VideoList = ({videos, getMainVideo}) => {
  return(
    videos.map((video, index) => (
      <video
        src={video[0]} key={index}
        style={{boxSizing: "border-box", width: "300px", margin: "10px"}}
        onClick={() => getMainVideo(video[0])}
      >
      </video>
    ))
  )
}

  export default VideoList
import React, { Component } from 'react'
import axios from 'axios'

var seekPauseTime = undefined;
var seekPlayTime = undefined;
var seekEndTime = undefined;
var prevSeekTime = undefined;

// this.props.loginDetails.user_id

class MainVideo extends Component {

  apiCalls = (eventName, eventTime) => {
    var apiData = {
      "event": eventName,
      "event_timestamp":new Date().toISOString(),
      "video_position": `${eventTime}s`,
      "uid": 1,
      "video_id": 1,
      "session_id": 1,
      "video_session_id": `1|1`
    }
    var eventData = {
      "event": eventName,
      "event_timestamp":new Date().toISOString(),
      "video_position": `${eventTime}s`,
    }
    this.props.getEventDetails(eventData)
    axios.post("http://localhost:4000/event", apiData)
    .then( (response) => {
      console.log(response)
    })
  }
  
  handleOnPlay = (time) => {
    if(this.video !== null ){
      console.log("play",this.video.currentTime, time)
      // this.setState({seekPlayTime:time})
      seekPlayTime = time
      this.video.currentTime === seekEndTime ?
      this.apiCalls("SEEK_END", this.video.currentTime):
      this.apiCalls("PLAY", this.video.currentTime)
    }
    
  }
  
  handleOnPause = () => {
    if(this.video !== null ){
      console.log("pause",this.video.currentTime)
      // this.setState({seekPauseTime:this.video.currentTime})
      seekPauseTime = this.video.currentTime
      this.apiCalls("PAUSE", this.video.currentTime)
  
    }
  }
  handleOnSeekStart = (time) => {
    if(this.video !== null ){
      console.log("seek start",this.video.currentTime, time, seekPauseTime)
      if(prevSeekTime !== seekPauseTime){
        console.log("seek times",prevSeekTime, seekPauseTime, prevSeekTime === seekPauseTime)
        prevSeekTime = seekPauseTime
        this.apiCalls("SEEK_START", this.video.currentTime)
      } 
    }
  }
  
  handleOnSeekEnd = () =>{
    if( this.video !== null ){
      seekEndTime = this.video.currentTime
      console.log("seek end", this.video.currentTime, seekPlayTime)
      // this.setState({eventDetails:"new event"})
      // console.log(this.state.eventDetails)
    } 
  }
  render(){
    return(
      <video
        src={this.props.mainVideoName} 
        ref={function(ref) { this.video = ref }.bind(this)}
        style={{width:"80%", margin:"40px"}} 
        controls
        onPlay={() => this.handleOnPlay(this.video.currentTime)}
        onPause={this.handleOnPause}
        onSeeking={() => this.handleOnSeekStart(this.video.currentTime)}
        onSeeked = {this.handleOnSeekEnd}
        onClick = {()=>this.props.getEventDetails(this.video.currentTime)}
      />
    )
  }
  
} 

export default MainVideo
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
// import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import EventTable from './Table';
import axios from 'axios'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
});

const videos = [
  ["/videos/Calculating average velocity or speed  One-dimensional motion  Physics  Khan Academy.mp4", "Calculating average velocity or speed  One-dimensional motion  Physics  Khan Academy"],
  ["/videos/Displacement from time and velocity example  One-dimensional motion  Physics  Khan Academy.mp4", "Displacement from time and velocity example  One-dimensional motion  Physics  Khan Academy"],
  ["/videos/Intro to vectors & scalars  One-dimensional motion  Physics  Khan Academy.mp4","Intro to vectors & scalars  One-dimensional motion  Physics  Khan Academy"],
  ["/videos/Solving for time  One-dimensional motion  Physics  Khan Academy.mp4", "Solving for time  One-dimensional motion  Physics  Khan Academy"]
]
var seekPauseTime = undefined;
var seekPlayTime = undefined;
var seekEndTime = undefined;
var prevSeekTime = undefined;

class Videos extends Component {
  constructor(props){
    super(props)
    this.state={
      mainVideo:videos[0][0],
      eventDetails : []
    }
  }

  componentDidMount = () => {
    if(this.video !== null ){
      console.log(this.video.currentTime)
    }
  }

  apiCalls = (eventName, eventTime) => {
    var data = {
      "event": eventName,
      "event_timestamp":new Date().toISOString(),
      "video_position": `${eventTime}s`,
      "uid": this.props.loginDetails.user_id,
      "video_id": 1,
      "session_id": 1,
      "video_session_id": `1|1`
    }
    axios.post("http://localhost:4000/event", data)
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
      this.setState({eventDetails:"new event"})
      console.log(this.state.eventDetails)
    } 
  }


  // VideoList = props => {
  //   return (
      
  //   )
  // }

  render(){
    const { classes } = this.props;

    const VideoFrame = () => {
      return (
        <Grid item xs={8} >
          <video src={this.state.mainVideo} 
            ref={function(ref) { this.video = ref }.bind(this)}
            style={{width:"80%", margin:"40px"}} 
            controls
            onPlay={() => this.handleOnPlay(this.video.currentTime)}
            onPause={this.handleOnPause}
            onSeeking={() => this.handleOnSeekStart(this.video.currentTime)}
            onSeeked = {this.handleOnSeekEnd}
          >
          </video>
          <EventTable eventDetails ={this.state.eventDetails}/>
        </Grid>
      )
    }

    return (
      <div className={classes.root}>
        <Grid container spacing={24} >
          <Grid item xs={4} >
            {
              videos.map((video, index) => 
                (
                  <video src={video[0]} key={index} 
                  style={{boxSizing: "border-box", width:"300px", margin:"10px"}}
                  onClick={() => this.setState({mainVideo:video[0]})}
                  >
                  </video>
                )
              )
            }
          </Grid>
          <VideoFrame />
        </Grid>
        
      </div>
    )
  }
}

Videos.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Videos)


// var data = {
    //   "event": "PLAY",
    //   "event_timestamp":new Date().toISOString(),
    //   "video_position": `${this.video.currentTime}s`,
    //   "uid": 1,
    //   "video_id": 1,
    //   "session_id": 1,
    //   "video_session_id": "1|1"
    // }
    // axios.post("http://localhost:4000/event", data)
    // .then( (response) => {
    //   console.log(response)
    // })
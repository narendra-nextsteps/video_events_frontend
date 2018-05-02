import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
// import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import EventTable from './Table'

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

class Videos extends Component {
  constructor(props){
    super(props)
    this.state={
      mainVideo:videos[0][0],
      seekingNow: false
    }
  }

  componentDidMount = () => {
    if(this.video !== null ){
      console.log(this.video.currentTime)
    }
  }

  handleOnPlay = () => {
    if(this.video !== null ){
      console.log("play",this.video.currentTime)
    }
  }

  handleOnPause = () => {
    if(this.video !== null ){
      console.log("pause",this.video.currentTime)
    }
  }
  handleSeekStart = () => {
    // if(!this.state.seekingNow){
      if(this.video !== null ){
        console.log("seek start",this.video.currentTime)
      }
      // this.setState({seekingNow: true})
    // }
    
  }

  render(){
    const { classes } = this.props;

    const VideoList = props => {
      return (
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
      )
    }

    const VideoFrame = () => {
      return (
        <Grid item xs={8} >
          <video src={this.state.mainVideo} 
          ref={function(ref) { this.video = ref }.bind(this)}
          style={{width:"80%", margin:"40px"}} 
          controls
          onPlay={this.handleOnPlay}
          onPause={this.handleOnPause}
          onSeeking={this.handleSeekStart}
          >
          </video>
          <EventTable/>
        </Grid>
      )
    }

    return (
      <div className={classes.root}>
        <Grid container spacing={24} >
          <VideoList />
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
import React, { Component } from 'react'
import VideoList from './VideoList'
import MainVideo from './MainVideo'
import EventsTable from './EventsTable'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'

const videos = [
  ["/videos/Calculating average velocity or speed  One-dimensional motion  Physics  Khan Academy.mp4", "Calculating average velocity or speed  One-dimensional motion  Physics  Khan Academy"],
  ["/videos/Displacement from time and velocity example  One-dimensional motion  Physics  Khan Academy.mp4", "Displacement from time and velocity example  One-dimensional motion  Physics  Khan Academy"],
  ["/videos/Intro to vectors & scalars  One-dimensional motion  Physics  Khan Academy.mp4","Intro to vectors & scalars  One-dimensional motion  Physics  Khan Academy"],
  ["/videos/Solving for time  One-dimensional motion  Physics  Khan Academy.mp4", "Solving for time  One-dimensional motion  Physics  Khan Academy"]
]

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

class VideosDashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      mainVideoName: videos[0][0],
      events:[]
    }
  }
  getEventDetails = (event) => {
    const events = [...this.state.events, event]
    this.setState({events})
  }

  render(){
    const { classes } = this.props;
    return(
      <Grid container spacing={24} >
        <Grid item xs={4} >
          <VideoList 
            videos={videos} 
            getMainVideo = { (mainVideoName) => this.setState({mainVideoName, events:[]})}
          />
        </Grid>
        <Grid item xs={8} >
          <MainVideo 
            mainVideoName = {this.state.mainVideoName} 
            getEventDetails={(event)=> this.getEventDetails(event)}
          />
          <EventsTable events = {this.state.events} />
        </Grid>
      </Grid>
    )
  }
}

VideosDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VideosDashboard)
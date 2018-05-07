import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '90%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 500,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

const EventsTable = (props) => {
  const { classes } = props;

  return(
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>#</CustomTableCell>
            <CustomTableCell numeric>Event Name</CustomTableCell>
            <CustomTableCell numeric>Video Position</CustomTableCell>
            <CustomTableCell numeric>Event Time</CustomTableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.events.map( (event, index) => {
              return (
                <TableRow className={classes.row} key={event.event_timestamp}>
                  <CustomTableCell>{index+1}</CustomTableCell>
                  <CustomTableCell numeric>{event.event}</CustomTableCell>
                  <CustomTableCell numeric>{event.video_position}</CustomTableCell>
                  <CustomTableCell numeric>{event.event_timestamp}</CustomTableCell>
                </TableRow>
              );
            })
          }
        </TableBody>
      </Table>
    </Paper>
    
  )
}

EventsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventsTable);
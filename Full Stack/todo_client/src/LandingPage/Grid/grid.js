import React from 'react';
import PropTypes from 'prop-types';
import './grid.css';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class Grids extends React.PureComponent {
     render(){
        const { classes } = this.props;
         return (
            <Grid style={{margin: '30px 0px', width: '100%'}} container spacing={24}>
            <Grid item xs>
                <Paper className={classes.paper}>
                <span className='icon'>
                    <i className="fas fa-plus-circle"></i>
                </span>
                    <h1>CREATE</h1>
                </Paper>
            </Grid>
            <Grid item xs>
                <Paper className={classes.paper}>
                <span className='icon'>
                    <i className="far fa-edit"></i>
                </span>
                    <h1>EDIT</h1>
                </Paper>
            </Grid>
            <Grid item xs>
                <Paper className={classes.paper}>
                <span className='icon'>
                    <i className="fas fa-trash-alt"></i>
                </span>
                    <h1>DELETE</h1>
                </Paper>
            </Grid>
            </Grid>
         )
     }
}

Grids.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Grids);
import React from 'react';
import {Link} from 'react-router-dom';
import './header.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Header extends React.Component {

    handleSignOut = () => {
        localStorage.clear();
        this.forceUpdate();
    }

    shouldComponentUpdate() {
        this.forceUpdate();
        return true;
    }

    render(){
        const { classes } = this.props;
       
        return (     
            <Toolbar id='toolbar' className='con'>
                {(localStorage.getItem('token')) ? <Link to='/todos' style={{textDecoration: 'none', color: 'black'}}><Button id='signInButton' color='inherit'>TODOS</Button></Link> : null }
                <Typography id='h6' variant='h6' color='inherit' className={classes.grow}>
                    <Link to='/todos' style={{textDecoration: 'none', color: 'black'}}>TO-DO</Link>
                </Typography>
                {(localStorage.getItem('token')) ? <Link to='/signin' style={{textDecoration: 'none', color: 'black'}}><Button id='signInButton' color='inherit' onClick={this.handleSignOut}>Sign Out</Button></Link>: <Link to='/signin' style={{textDecoration: 'none', color: 'black'}}><Button id='signInButton' color='inherit'>Sign In</Button></Link> }
                <Link to='/signup' style={{textDecoration: 'none', color: 'black'}}><Button id='signUpButton' color='inherit' href='/signup'>Sign Up</Button></Link>
            </Toolbar>    
        );
    }


}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Header);
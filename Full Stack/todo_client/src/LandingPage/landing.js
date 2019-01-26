import React, { Component } from 'react'
import './landing.css';
import Steps from './Stepper/stepper'
import Grids from './Grid/grid';

class Landing extends Component {
  render() {
    return (
      <React.Fragment>
        <div className='topContent'>
        <div className='topTitle'>
        <h2>ACCESS YOUR TODOS FROM EVERYWHERE AND EVERYTIME</h2> 
        </div>
        <img alt='image1' src='https://images.pexels.com/photos/1036808/pexels-photo-1036808.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'></img>
        </div>

        <div className='grids'>
        <p>CUSTOMIZE YOUR TODOS</p>
        <Grids/>
        </div>

        <div className='hr1'>
        <p>OUR APP WILL TAKE CARE OF YOUR NOTES</p>
        </div>
        <div className='image2'>
        <img alt='image2' src='https://www.wallpaperup.com/uploads/wallpapers/2017/07/02/1093461/427c9dbe8bea33e2a860be456e63c69b-1000.jpg'></img>
        </div>

        <div className='stepper'>
        <p>DO WHAT YOU NEED TO DO</p>
        <Steps/>
        </div>
      </React.Fragment>
    )
  }
}

export default Landing;

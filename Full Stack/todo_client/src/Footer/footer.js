import React from 'react';
import './footer.css';

const Footer = () => {
    return (
     
        <footer>
            <div className='left-block'>
                <div className='location'>
                    <h2>Our Location</h2>
                    <h3>Yerevan, Armenia</h3>
                    <h3>Komitas str</h3>
                </div>
                <div className='number'>
                    <h2>Contact Phone</h2>
                    <h3>+374 (99) 20-77-78</h3>
                </div>
                <div className='email'>
                    <h2>Contact Email</h2>
                    <h3>Todo@gmail.com</h3>
                </div>
            </div>

            <div className='right-block'>
                <div className='about'>
                    <h1>About Us</h1>
                    <h3>Todo App is simple but modern app that can help you to organize your day.</h3>
                </div>
                <h1>We are glad to see you here today <span style={{color: 'red'}}><i className="far fa-heart"></i></span></h1>
            </div>
        </footer>
  
    );
};

export default Footer;
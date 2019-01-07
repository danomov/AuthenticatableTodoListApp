import React from 'react';
import { Redirect } from 'react-router-dom';


class SignUp extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            password_confirmation: '',
            redirect: false,
            inputErrors: '',
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }    

    redirect = () => {
        localStorage.clear();
        this.setState({redirect: true});
    } 

    renderRedirect = () => {
        if(this.state.redirect){
            return <Redirect to='/signin'/>;
        }
    }

    inputValidation = () => {
        let isValid = true;
        let inputErrors = {};
        
        
        if(!this.state.email || !this.state.email.match(/^[a-zA-Z0-9._-]+@[a-z.-]+\.[a-zA-Z]{2,6}$/) || this.state.email.length > 50){
            isValid = false;
            inputErrors.email = 'Invalid Email';
        }
        if(this.state.password.length < 6 || this.state.password.length > 50){
            isValid = false;
            inputErrors.password = 'Minimum length of password is 6 characters and maximum is 50';
        }
        if(this.state.password !== this.state.confirmPassword || this.state.confirmPassword.length < 6){
            isValid = false;
            inputErrors.confirmPassword = 'Confirm password error';
        }
        
        this.setState({
            inputErrors
        });
        return isValid;
    }
    

    handleSignUp = () => {
        
        if(this.inputValidation()){
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(
            {
            'user':{
                'email':this.state.email, 
                'password':this.state.password,
                'password_confirmation':this.state.password_confirmation,
            }})
            })
            .then((response) => { return response.json() })
            .then(() => { this.redirect() })
            .catch(err => { console.log(err) })
        }

    }

    render() {
        return (
            <React.Fragment>
            {this.renderRedirect()}
            <div id='signup'>
            <h1>Sign Up</h1>
            <input name='email' type='text' placeholder='Email' onChange={this.onChange}></input><br/>
            <p className='error'>{this.state.inputErrors.email}</p>
            <input name='password' type='password' placeholder='Password' onChange={this.onChange}></input><br/>
            <p className='error'>{this.state.inputErrors.password}</p>
            <input name='password_confirmation' type='password' placeholder='Password Confirmation' onChange={this.onChange}></input><br/>
            <p className='error'>{this.state.inputErrors.confirmPassword}</p>
            <button onClick={this.handleSignUp}>Sign Up</button>
            </div>
            </React.Fragment>
        )
    }
}

export default SignUp;
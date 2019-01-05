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

    handleSignUp = () => {
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

    render() {
        return (
            <React.Fragment>
            {this.renderRedirect()}
            <div id='signup'>
            <h1>Sign Up</h1>
            <input name='email' type='text' placeholder='Email' onChange={this.onChange}></input><br/>
            <input name='password' type='password' placeholder='Password' onChange={this.onChange}></input><br/>
            <input name='password_confirmation' type='password' placeholder='Password Confirmation' onChange={this.onChange}></input><br/>
            <button onClick={this.handleSignUp}>Sign Up</button>
            </div>
            </React.Fragment>
        )
    }
}

export default SignUp;
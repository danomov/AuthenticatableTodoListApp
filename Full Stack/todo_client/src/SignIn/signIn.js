import React from 'react';
import { Redirect } from 'react-router-dom';
import './signIn.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class SignIn extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            redirect: false,
            errors: '',
        }
    }
  
    
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    

    renderRedirect = () => {
        if(this.state.redirect) {
            return <Redirect to='/todos'/>;
        }
    }


    redirect = () => {
        this.setState({redirect: true});
    }


    submit = () => {   
        
        fetch('http://localhost:3000/user_token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(
            {
            'auth':{
                'email':this.state.email, 
                'password':this.state.password,
            }})
            })
            .then((response) => { return response.json() })
            .then((data)=>{
                localStorage.setItem('token', `${data.jwt}`);
                this.redirect();
            })
            .catch(err => { this.setState({errors: 'Invalid Email or Password'}); console.log(`%c${err}`, 'color: yellow; background: red; font-size:20px') })
    
    }

    componentDidMount() {
        if(localStorage.getItem('token')){
            this.redirect();
        }
    }

    render() {
        return (
            <div className='signin'>
                {this.renderRedirect()}
                <h1>Sign In</h1>
                <p className='error'>{this.state.errors}</p>
                <TextField id='outlined-name' label='Email' margin='normal' variant='outlined' name='email' type='text' placeholder='Email' onChange={this.onChange}/><br/>
                <TextField id='outlined-name' label='Password' margin='normal' variant='outlined' name='password' type='password' placeholder='Password' onChange={this.onChange}/><br/>
                <Button variant="contained" size="medium" color="primary" onClick={this.submit}>Sign In</Button>
            </div>
        )
    }
}


export default SignIn;
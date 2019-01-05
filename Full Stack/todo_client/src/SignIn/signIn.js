import React from 'react';
import { Redirect } from 'react-router-dom';



class SignIn extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            redirect: false,
        }
    }
    
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSignOut = () => {
        localStorage.clear();
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
            .catch(err => { console.log(err) })
    
    }

    componentDidMount() {
        if(localStorage.getItem('token')){
            this.redirect();
        }
    }

    render() {
        return (
            <div id='signin'>
                {this.renderRedirect()}
                <h1>Please Sign In</h1>
                <input name='email' type='text' placeholder='Email' onChange={this.onChange}></input>
                <input name='password' type='password' placeholder='Password' onChange={this.onChange}></input>
                <button onClick={this.submit}>Sign In</button>
                <button onClick={this.handleSignOut}>Sign Out</button>
            </div>
        )
    }
}


export default SignIn;
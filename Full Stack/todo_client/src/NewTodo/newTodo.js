import React from 'react';
import { Redirect } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

const theme = createMuiTheme({
    palette: {
      primary: green,
    },
    typography: {
      useNextVariants: true,
    },
});

class NewTodo extends React.PureComponent {

    constructor(props){
        super(props)
        this.state = {
            title: '',
            redirect: false,
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    redirect = () => {
        this.setState({redirect: true})
    }

    renderRedirect = () => {
        if(this.state.redirect) {
            return <Redirect to='/todos'/>;
        }
    }
    
    handleAdd = () => {
            fetch('http://localhost:3000/todos', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': localStorage.getItem('token'),
                },
                body: JSON.stringify(
                {
                'todo':{
                    'title': this.state.title
                }})
                })
                .then((response) => { return response.json() })
                .then(() => { this.redirect() })
                .catch(err => { console.log(err) })
    }
    


    render() {
        return(
        <div style={{border: '2px solid black', borderRadius: '5px', width: '300px', margin: '0 auto', height: 'auto', padding: '20px 40px 60px 40px'}}>
        {this.renderRedirect()}
        <p style={{marginTop: '0'}}>New Todo</p>
        <Input name='title' type='text' onChange={this.onChange} placeholder='Title'/>
        <MuiThemeProvider theme={theme}>
        <Button variant="contained" size="small" color="primary" onClick={this.handleAdd}>Add</Button>
        </MuiThemeProvider>
        </div>
        )
    }
}

export default NewTodo;
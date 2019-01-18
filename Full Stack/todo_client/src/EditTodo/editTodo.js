import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

const theme = createMuiTheme({
    palette: {
      primary: yellow,
    },
    typography: {
      useNextVariants: true,
    },
});

class EditTodo extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: '',
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
    
    handleEdit = () => {
            fetch(`http://localhost:3000/todos/${this.state.id}`, {
                method: 'PUT',
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
    
    componentDidMount(){
        this.setState({ id: this.props.location.state.id, title: this.props.location.state.title })
    }

    render() {
        return(
        <div style={{border: '2px solid black', borderRadius: '5px', width: '300px', margin: '0 auto', height: 'auto', padding: '20px 40px 60px 40px'}}>
        {this.renderRedirect()}
        <p style={{marginTop: '0'}}>Edit Todo</p>
        <Input name='title' type='text' defaultValue={this.state.title} onChange={this.onChange} placeholder='Title'/>
        <MuiThemeProvider theme={theme}>
        <Button variant="contained" size="small" color="primary" onClick={this.handleEdit}>Edit</Button>
        </MuiThemeProvider>
        </div>
        )
    }
}

export default EditTodo;
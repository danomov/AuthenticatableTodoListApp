import React from 'react';
import { Redirect } from 'react-router-dom';

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
        <React.Fragment>
        {this.renderRedirect()}
        <input name='title' type='text' onChange={this.onChange} placeholder='Title'/>
        <button onClick={this.handleAdd}>Add</button>
        </React.Fragment>
        )
    }
}

export default NewTodo;
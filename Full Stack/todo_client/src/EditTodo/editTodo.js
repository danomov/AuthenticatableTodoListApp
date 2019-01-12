import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

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
        <React.Fragment>
        {this.renderRedirect()}
        <input name='title' type='text' defaultValue={this.state.title} onChange={this.onChange} placeholder='Title'/>
        <button onClick={this.handleEdit}>Edit</button>
        </React.Fragment>
        )
    }
}

export default EditTodo;
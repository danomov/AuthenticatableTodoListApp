import React from 'react';
import { Redirect } from 'react-router-dom';

class Todos extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
           data: '',
           redirect: false,
        }
    }

    handleSignOut = () => {
        localStorage.clear()
    }

    redirect = () => {
        this.setState({redirect: true})
    }

    renderRedirect = () => {
        if(this.state.redirect){
        return <Redirect to='/todos/create'/>;
        }
    }

    fetchTodos = () => {
        fetch('http://localhost:3000/todos', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('token'),
            },
            })
            .then((response) => { return response.json() })
            .then((data)=>{ this.setState({data: data}) })
            .catch(err => { console.log(err) })
    }

    handleDelete = (e) => {
        fetch(`http://localhost:3000/todos/${e.target.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('token'),
            },
        })
        .then(() => this.fetchTodos())
        .catch(err => { alert(err) })
    }

    componentDidMount() {
        this.fetchTodos();
    }


    render () {
        if(this.state.data){
            return (
                <React.Fragment>
                    {this.renderRedirect()}
                <div id='data'>
                <button onClick={this.redirect}>New Todo</button>
                {
                    this.state.data.map(element => {
                        return (
                        <div key={element[1]}>
                        <h1>{element[0]}</h1>
                        <button id={element[1]} onClick={this.handleDelete}>DELETE</button>
                        </div>
                        )
                    })
                }
                </div>
                </React.Fragment>
            )
        }
        else return <h1 style={{fontSize: '70px'}}>Loading ...</h1>
    }
}

export default Todos;
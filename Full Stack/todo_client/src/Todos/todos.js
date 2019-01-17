import React from 'react';
import { Redirect } from 'react-router-dom';
import SearchBar from '../SearchBar/searchBar';

class Todos extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           data: '',
           todoId: '',
           todoTitle: '',
           newTodoRoute: false,
           editTodoRoute: false,
        }
    }

    handleSignOut = () => {
        localStorage.clear()
    }

    handleNewTodo = () => {
        this.setState({newTodoRoute: true})
    }

    renderRedirect = () => {
        if(this.state.newTodoRoute){
        return <Redirect to='/todos/create'/>;
        }
        else if(this.state.editTodoRoute){
        return <Redirect to={{pathname: '/todos/edit', state: { title: this.state.todoTitle, id: this.state.todoId }}}/>;
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
            .then((fetchData)=>{ this.setState({data: fetchData}) })
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

    handleEditTodo = (e) => {
        this.setState({editTodoRoute: true, todoId: e.target.id, todoTitle: e.target.name})
    }

    onClick = (e, filteredData) => {
        this.setState({data: filteredData});
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
                <button onClick={this.handleNewTodo}>New Todo</button><br/>
                <SearchBar data={this.state.data} onClick={this.onClick}/>
                {
                    this.state.data.map(element => {
                        return (
                        <div key={element[1]}>
                        <h1>{element[0]}</h1>
                        <button id={element[1]} name={element[0]} onClick={this.handleEditTodo}>Edit</button>
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
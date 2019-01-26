import React from 'react';
import { Redirect } from 'react-router-dom';
import './todos.css';
import SearchBar from '../SearchBar/searchBar';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
      primary: blueGrey,
    },
    typography: {
      useNextVariants: true,
    },
});

class Todos extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           data: '',
           todoId: '',
           todoTitle: '',
           filteredTodos: '',
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
        .then(() => { this.setState({filteredTodos: ''}); this.fetchTodos()})
        .catch(err => { alert(err) })
    }

    handleEditTodo = (e) => {
        this.setState({editTodoRoute: true, todoId: e.target.id, todoTitle: e.target.name})
    }

    onClick = (e, filteredData) => {
        this.setState({filteredTodos: filteredData});
    }

    componentDidMount() {
        this.fetchTodos();
    }


    render () {
        if(this.state.data && !this.state.filteredTodos){
            return (
                <React.Fragment>
                    {this.renderRedirect()}
                <div id='data'>
                <MuiThemeProvider theme={theme}>
                <Button id='new' variant='contained' size='medium' color='primary' onClick={this.handleNewTodo}>New Todo</Button><br/>
                </MuiThemeProvider>
                <SearchBar data={this.state.data} onClick={this.onClick}/>
                {
                    this.state.data.map(element => {
                        return (
                        <table key={element[1]}>
                        <td>
                        <p>{element[0]}</p>
                        </td>
                        <td>
                        <Button style={{marginLeft: '70px'}} variant='contained' size='small' color='primary' id={element[1]} name={element[0]} onClick={this.handleEditTodo}>Edit</Button>
                        <Button style={{marginLeft: '5px'}}  variant='contained' size='small' color='secondary' id={element[1]} onClick={this.handleDelete}>DELETE</Button>
                        </td>
                        </table>
                        )
                    })
                }
                </div>
                </React.Fragment>
            )
        }
        else if(this.state.filteredTodos){
            return (
                <React.Fragment>
                    {this.renderRedirect()}
                <div id='data'>
                <MuiThemeProvider theme={theme}>
                <Button id='new' variant='contained' size='medium' color='primary' onClick={this.handleNewTodo}>New Todo</Button><br/>
                </MuiThemeProvider>
                <SearchBar data={this.state.data} onClick={this.onClick}/>
                {
                    this.state.filteredTodos.map(element => {
                        return (
                        <table key={element[1]}>
                        <td>
                        <p>{element[0]}</p>
                        </td>
                        <td>
                        <Button style={{marginLeft: '70px'}} variant='contained' size='small' color='primary' id={element[1]} name={element[0]} onClick={this.handleEditTodo}>Edit</Button>
                        <Button style={{marginLeft: '5px'}}  variant='contained' size='small' color='secondary' id={element[1]} onClick={this.handleDelete}>DELETE</Button>
                        </td>
                        </table>
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
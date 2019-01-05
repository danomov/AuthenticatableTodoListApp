import React from 'react';


class Todos extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
           data: '',
        }
    }

    handleSignOut = () => {
        localStorage.clear()
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


    componentDidMount() {
        this.fetchTodos();
    }


    render () {
        if(this.state.data){
            return (
                <div id='data'>
                {
                    this.state.data.map(element => {
                        return (
                        <div key={element.id}>
                        <h1>{element.title}</h1>
                        <h4>{element.finished}</h4>
                        </div>
                        )
                    })
                }
                </div>
            )
        }
        else return <h1 style={{fontSize: '70px'}}>Loading ...</h1>
    }
}

export default Todos;
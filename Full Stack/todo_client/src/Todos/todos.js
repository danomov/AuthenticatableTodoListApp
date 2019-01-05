import React from 'react';


class Todos extends React.PureComponent {
    

    handleSignOut = () => {
        localStorage.clear()
    }



    render () {
        return (
        <React.Fragment>
        <h1>TODOS</h1>
        <button onClick={this.handleSignOut}>Sign Out</button>
        </React.Fragment>
        )
    }
}

export default Todos;
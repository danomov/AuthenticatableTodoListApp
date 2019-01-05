import React, { Component } from 'react';
import './App.css';
import Todos from './Todos/todos';
import SignIn from './SignIn/signIn';
import PrivateRoute from './PrivateRoute/privateRoute';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
      <Switch>
        <Route path='/' exact component={SignIn}/>
        <PrivateRoute path='/todos' exact component={Todos}/>
      </Switch>
      </Router>
      </div>
    );
  }
}

export default App;

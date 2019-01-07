import React from 'react';
import './App.css';
import Todos from './Todos/todos';
import SignIn from './SignIn/signIn';
import SignUp from './SignUp/signUp';
import PrivateRoute from './PrivateRoute/privateRoute';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from './Header/header';

class App extends React.PureComponent {
  render() {
    return (
      <div className="App">
      <Router>
      <React.Fragment>
      <Header/>
      <Switch>
        <Route path='/signin' exact component={SignIn}/>
        <Route path='/signup' exact component={SignUp}/>
        <PrivateRoute path='/todos' exact component={Todos}/>
      </Switch>
      </React.Fragment>
      </Router>
      </div>
    );
  }
}

export default App;

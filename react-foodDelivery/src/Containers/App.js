import React, { Component } from 'react';
import './App.css';
import Layout from '../Layout/Layout';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStroopwafel,faSearch,faShoppingCart,faBackward,faPlusCircle,faMinusCircle,faUser
,faWindowClose,faTimes,faRobot} from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SideDrawer from '../Components/SideDrawer/SideDrawer';
import Register from '../Components/Register';
import jwt_decode from "jwt-decode";
import { setAuthToken } from "../store/utility";
import 'bootstrap/dist/css/bootstrap.min.css';

import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from '../store/reducers';
import thunk from 'redux-thunk';
import { setCurrentUser, logoutUser } from "../store/actions/actions";
import Orders from '../Components/Orders';

library.add(faStroopwafel,faSearch,faShoppingCart,faBackward,faPlusCircle,faMinusCircle,faUser,faWindowClose,faTimes,faRobot)

const logger = store =>{

  return next => {
      return action => {
          const result=next(action);
          return result;
      }
  };
}

const store = createStore(reducer, applyMiddleware(logger,thunk));

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Layout}/>
            <Route exact path="/login" component={SideDrawer}/>
            <Route exact path="/register" component={Register}/>
            <Switch>
              <Route exact path="/orders" component={Orders}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

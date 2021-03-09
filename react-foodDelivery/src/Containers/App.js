import React, { Component } from 'react';
import './App.css';
import Layout from '../Layout/Layout';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStroopwafel,faSearch,faShoppingCart,faBackward,faPlusCircle,faMinusCircle,faUser
,faWindowClose,faTimes,faRobot} from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SideDrawer from '../Components/SideDrawer/SideDrawer';
import Register from '../Components/Register'


library.add(faStroopwafel,faSearch,faShoppingCart,faBackward,faPlusCircle,faMinusCircle,faUser,faWindowClose,faTimes,faRobot)

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Layout}/>
          <Route exact path="/login" component={SideDrawer}/>
          <Route exact path="/register" component={Register}/>
        </div>
      </Router>
    );
  }
}

export default App;

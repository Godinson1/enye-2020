import React from 'react';
import './App.css';
import Home from './Test';
import Result from './Results';
import All from './All';
import {Provider} from 'react-redux';
import store  from './store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
require('dotenv').config();

const App: React.FC = () => {
  return (
    <Provider store={store}>
    <div className="App">
      <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/search" component={Result}/>
            <Route exact path="/results" component={All}/>
        </Switch>
      </Router>
    </div>
    </Provider>
  );
}

export default App;

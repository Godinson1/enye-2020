import React from 'react';
import './App.css';
import Home from './Test';
import {Provider} from 'react-redux';
import store  from './store'
require('dotenv').config();

const App: React.FC = () => {
  return (
    <Provider store={store}>
    <div className="App">
      <Home />
    </div>
    </Provider>
  );
}

export default App;

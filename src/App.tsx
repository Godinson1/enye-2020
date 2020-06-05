import React from 'react';
import './App.css';
import Home from './Good';
require('dotenv').config();

const App: React.FC = () => {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;

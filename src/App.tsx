import React from 'react';
import './App.css';
import Home from './Home';
require('dotenv').config();

const App: React.FC = () => {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;

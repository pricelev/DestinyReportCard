import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Topnav from './components/Topnav'
import './components/Topnav.css'
import Main from './components/Main'


function App() {
  return (
    <div className="App">
      <Topnav />
      <Main />
    </div>
  );
}

export default App;

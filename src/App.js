import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Album from './components/album.js';
import Navigation from './components/navigation';

class App extends Component {
  render() {
    return (
      <div className="App container">
          <div>
            <Navigation />
          </div>
          <div>
            <Album/>
          </div>
        

      </div>
    );
  }
}

export default App;

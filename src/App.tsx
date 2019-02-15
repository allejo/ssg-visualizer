import React, { Component } from 'react';
import Tank, { TeamColor } from './components/Tank';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Tank
            tank={{
              name: '',
              position: [0, 0, 0],
              rotation: 0,
              team: TeamColor.Red,
              disabled: false,
            }}
          />
        </header>
      </div>
    );
  }
}

export default App;

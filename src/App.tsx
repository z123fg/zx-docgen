import React from 'react';
import logo from './logo.svg';
import './App.css';
import Outline from './components/Outline';
import EditScreen from './screens/EditScreen';

function App() {
  return (
    <div className="App">
      {/* <Outline/> */}
      <EditScreen/>
    </div>
  );
}

export default App;

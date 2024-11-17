// src/App.js
import React from 'react';
import './App.css';
import './styles/SeatSelection.css'
import SeatSelection from './components/SeatSelection';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>فروش بلیت کنسرت</h1>
        <SeatSelection />
      </header>
    </div>
  );
}

export default App;

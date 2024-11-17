// src/App.js
import React from 'react';
import './App.css';
import './styles/SeatSelection.css'
import SeatSelection from './components/SeatSelection';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Concert Ticket Booking</h1>
        <SeatSelection />
      </header>
    </div>
  );
}

export default App;

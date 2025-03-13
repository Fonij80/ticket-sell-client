import './App.css'
import SeatSelection from './components/SeatSelection/SeatSelection';
import seatData from './seatData.json';

function App() {
  return (
    <>
      <h1>کنسرت</h1>
      <SeatSelection rows={seatData} />
    </>
  )
}

export default App

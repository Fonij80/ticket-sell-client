import './App.css'
import SeatSelection from './components/SeatSelection/SeatSelection';
import seatData from './seatData.json';

function App() {
  return (
    <>
      <SeatSelection rows={seatData} />
    </>
  )
}

export default App

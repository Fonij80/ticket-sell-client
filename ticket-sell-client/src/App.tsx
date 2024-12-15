import './App.css'
import SeatSelection from './components/SeatSelection/SeatSelection';

function App() {
  return (
    <>
      <SeatSelection totalSeats={300} pricePerSeat={1000} />
    </>
  )
}

export default App

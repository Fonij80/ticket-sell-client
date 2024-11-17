import React, { useState } from 'react';
import '../styles/SeatSelection.css';

const SeatSelection = () => {
    // Mock data for 300 seats
    const mockSeats = Array.from({ length: 300 }, (_, index) => ({
        id: index + 1,
        reserved: Math.random() < 0.3 // Randomly reserve about 30% of seats
    }));

    const [seats, setSeats] = useState(mockSeats);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [username, setUsername] = useState('');

    const toggleSeat = (seat) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seat));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    const handlePurchase = () => {
        alert(`Tickets purchased successfully for seats: ${selectedSeats.join(', ')} by ${username}`);
        setSelectedSeats([]); // Reset selected seats after purchase
    };

    return (
        <div className="seat-selection-container">
            <h2>Choose Your Seats</h2>
            <input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="username-input"
            />
            <div className="seats">
                {seats.map(seat => (
                    <button
                        key={seat.id}
                        className={`seat ${seat.reserved ? 'reserved' : selectedSeats.includes(seat.id) ? 'selected' : ''}`}
                        onClick={() => !seat.reserved && toggleSeat(seat.id)}
                        disabled={seat.reserved}
                    >
                        {seat.id}
                    </button>
                ))}
            </div>
            <button onClick={handlePurchase} disabled={selectedSeats.length === 0} className="purchase-button">Buy Tickets</button>
        </div>
    );
};

export default SeatSelection;

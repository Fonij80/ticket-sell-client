import React, { useState } from 'react';
import './SeatSelection.css';
import axios from 'axios';
import { FaChair } from 'react-icons/fa';

interface Seat {
    id: number;
    price: number;
    reserved: boolean;
}

interface Row {
    seatsCount: number;
    price: number;
}

interface SeatSelectionProps {
    rows: Row[];
}

const SeatSelection: React.FC<SeatSelectionProps> = ({ rows }) => {
    const mockSeats: Seat[] = [];
    let seatId = 1;

    rows.forEach((row) => {
        for (let i = 0; i < row.seatsCount; i++) {
            mockSeats.push({
                id: seatId++,
                price: row.price,
                reserved: Math.random() < 0.3
            });
        }
    });

    const [seats] = useState<Seat[]>(mockSeats);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [username, setUsername] = useState<string>('');

    const toggleSeat = (seatId: number) => {
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    const totalPrice = selectedSeats.reduce((total, seatId) => {
        const seat = seats.find(s => s.id === seatId);
        return total + (seat ? seat.price : 0);
    }, 0);

    const handlePurchase = async () => {
        if (selectedSeats.length === 0) {
            alert("لطفا حداقل یک صندلی را انتخاب کنید.");
            return;
        }

        if (!username.trim()) {
            alert("لطفا نام کاربری خود را وارد کنید.");
            return;
        }

        try {
            await axios.post('/api/reserve-seats', { username, seats: selectedSeats, totalPrice });

            alert(`Tickets purchased successfully for seats: ${selectedSeats.join(', ')}.\nTotal Price: ${totalPrice} تومان`);

            setSelectedSeats([]);
            setUsername('');
        } catch (error) {
            console.error('Error reserving seats:', error);
            alert("خطا در ثبت نام صندلی‌ها. لطفا دوباره تلاش کنید.");
        }
    };

    return (
        <div className="seat-selection-container">
            <h2>صندلی‌های خود را انتخاب کنید</h2>
            <input
                type="text"
                placeholder="نام کامل خود را وارد کنید"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="username-input"
            />
            <div className="seats">
                {seats.map(seat => (
                    <div key={seat.id} className={`seat ${seat.reserved ? 'reserved' : selectedSeats.includes(seat.id) ? 'selected' : ''}`}>
                        <FaChair
                            className={`seat-icon ${seat.reserved ? 'reserved' : ''}`}
                            onClick={() => !seat.reserved && toggleSeat(seat.id)}
                            title={`قیمت: ${seat.price} تومان`}
                        />
                        <span className="seat-number">{seat.id}</span>
                    </div>
                ))}
            </div>
            <div className="total-price">
                <p>قیمت کل: {totalPrice} تومان</p>
            </div>
            <button onClick={handlePurchase} disabled={selectedSeats.length === 0} className="purchase-button">خرید بلیت</button>
        </div>
    );
};

export default SeatSelection;

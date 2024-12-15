import React, { useState } from 'react';
import './SeatSelection.css';
import axios from 'axios';

interface Seat {
    id: number;
    price: number;
    reserved: boolean;
}

interface SeatSelectionProps {
    totalSeats: number;
    pricePerSeat: number;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({ totalSeats, pricePerSeat }) => {
    const mockSeats: Seat[] = Array.from({ length: totalSeats }, (_, index) => ({
        id: index + 1,
        price: pricePerSeat,
        reserved: Math.random() < 0.3
    }));

    const [seats, setSeats] = useState<Seat[]>(mockSeats);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [username, setUsername] = useState<string>('');

    const toggleSeat = (seatId: number) => {
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    const totalPrice = selectedSeats.length * pricePerSeat;

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
            <p>صندلی‌های خود را انتخاب کنید</p>
            <input
                type="text"
                placeholder="نام کاربری خود را وارد کنید"
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
                        title={`قیمت: ${seat.price} تومان`}
                    >
                        {seat.id}
                    </button>
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

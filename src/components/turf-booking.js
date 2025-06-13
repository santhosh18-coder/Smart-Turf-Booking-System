import { useState } from "react"
import './turf-booking.css'
import { useLocation } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const generateSlots = (start = 6, end = 22) => {
    const slots = []
    for (let hour = start; hour < end; hour++) {
        slots.push(`${hour}:00`)
        slots.push(`${hour}:30`)
    }
    return slots
}

export default function BookingDetails() {

    const location = useLocation()
    const { turfData } = location.state || {}

    const navigate = useNavigate()

    const [information, setInformation] = useState({
        name: '',
        mobile: '',
        email: '',
        venueName: turfData.venue,
        selectedDate: '',
        startTime: null,
        endTime: null
    })

    const slots = generateSlots()

    function handleChange(e) {
        setInformation(prev => (
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))
    }

    function handleBooking() {
        if (information.name && information.mobile && information.email && information.venueName && information.selectedDate && information.startTime && information.endTime) {
            const options = {
                key: "rzp_test_PXmE3fsFnVwRns", // ✅ Only key_id here
                amount: 50000, // paise = ₹500
                currency: "INR",
                name: "Turf Booking",
                description: "Slot Booking",
                handler: function (response) {
                    console.log("Payment successful", response);
                },
                prefill: {
                    name: "John Doe",
                    email: "john@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        }
        else {
            toast.error('Insufficient Data')
        }

    }

    function HourToMinute(time) {
        const [hours, minutes] = time.split(':').map(Number)
        return (hours * 60) + minutes
    }

    function handleDate(e) {
        setInformation({
            ...information,
            selectedDate: e.target.value
        })
    }

    function handleSlotClick(slot) {
        if (!information.startTime) {
            setInformation({
                ...information,
                startTime: slot
            })
        }
        else if (!information.endTime) {
            if (HourToMinute(slot) > HourToMinute(information.startTime)) {
                setInformation({
                    ...information,
                    endTime: slot
                })
            }
            else {
                toast.error('End Time Should Be More Than Start Time')
            }
        }
        else {
            setInformation({
                ...information,
                startTime: slot,
                endTime: null
            })
        }
    }

    function handleReset() {
        setInformation({
            ...information,
            selectedDate: '',
            startTime: null,
            endTime: null
        })
    }

    const allBookings = JSON.parse(localStorage.getItem('Booking_details')) || []

    const bookingForDay = allBookings.filter((b) => {
        return b.selectedDate === information.selectedDate && b.venueName === turfData.venue
    })

    function generateLockedSlots() {
        const lockedSlots = new Set()
        bookingForDay.forEach((booking) => {
            const start = booking.startTime
            const end = booking.endTime
            slots.forEach((slot) => {
                if (slot >= start && slot <= end) {
                    lockedSlots.add(slot)
                }
            })
        })
        return lockedSlots
    }

    const lock = generateLockedSlots()

    return (
        <div className="booking-wrapper">
            <div className="date-picker">
                <MdOutlineArrowBackIosNew size={32} onClick={() => { navigate('/booking') }} style={{ cursor: 'pointer', color: 'gray', position: 'absolute', left: '10px', top: '40%' }} />
                <h2>Choose Your Date And Time</h2>
                <div>
                    <label>Select Date:</label>
                    <input type="date" value={information.selectedDate} onChange={(e) => handleDate(e)} />
                </div>
            </div>
            <div className="slot-grid">
                {slots.map((slot, index) => {
                    const isSelected = slot === information.startTime || slot === information.endTime
                    const inRange = information.startTime && information.endTime && HourToMinute(slot) > HourToMinute(information.startTime) && HourToMinute(slot) < HourToMinute(information.endTime)
                    const isLocked = lock.has(slot)
                    return (
                        <button key={index} disabled={isLocked} onClick={() => handleSlotClick(slot)} className={`slot-button ${isSelected ? 'isSelected' : ''} ${inRange ? 'inRange' : ''} ${isLocked ? 'isLocked' : ''}`}>{slot}</button>
                    )
                })}
            </div>
            <div className="slot-action">
                <p>Selected Date : {information.selectedDate}</p>
                <p>Selected Time : {information.startTime} -- {information.endTime} </p>
                <button onClick={handleReset}>Reset Selection</button>
            </div>
            <div className="turf-det">
                <div className="turf-inf">
                    <label htmlFor='turf-name'>Name</label>
                    <input type="text" name="name" value={information.name} onChange={handleChange} id="turf-name" />
                </div>
                <div className="turf-inf">
                    <label htmlFor='turf-Mobile'>Mobile No.</label>
                    <input type="text" name="mobile" value={information.mobile} onChange={handleChange} id="turf-mobile" />
                </div>
                <div className="turf-inf">
                    <label htmlFor='turf-email'>Email</label>
                    <input type="text" name="email" value={information.email} onChange={handleChange} id="turf-email" />
                </div>
                <div className="turf-but">
                    <button onClick={handleBooking}>Confirm Booking</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './admin.css'
import { useEffect } from 'react'
import AdminBooking from './admin-bookings'
import { MdOutlineArrowBackIosNew } from "react-icons/md";


export default function Admin() {
    const [myBookings, setMyBookings] = useState([])
    const [isLinked, setIsLinked] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const admin = JSON.parse(localStorage.getItem('loggedInAdmin')) || null
        if (!admin) {
            alert('Admin is Not Logged In')
            navigate('/admin_login')
        }
        const venue = admin.venue || null
        if (!venue) {
            setIsLinked(false)
            return
        }

        const bookings = JSON.parse(localStorage.getItem('Booking_details')) || null

        if (bookings) {
            const filtered = bookings.filter((booking) =>
                booking.venueName === venue
            )
            setMyBookings(filtered)
        }

    }, [navigate])


    const Books = myBookings.map((myBooking, index) => {
        return <AdminBooking key={index} myBooking={myBooking} />
    })

    console.log(Books)


    return (
        <div className="admin-wrapper">
            <div>
                <div className="admin-header">
                    <MdOutlineArrowBackIosNew size={32} onClick={() => { navigate('/') }} style={{ cursor: 'pointer', color: 'gray', position: 'absolute', left: '10px', top: '40%' }} />
                    <h1>Bookings</h1>
                </div>
                {!isLinked && <div className='not-linked'>
                    <p>Account Is Not Linked With Turf</p>
                    <button onClick={() => { navigate('/listing') }}>Get Listed</button>
                </div>}
                {isLinked && Books.length === 0 && <div className='no-bookings'>
                    <h2>No Bookings Yet</h2>
                </div>}
                {isLinked && Books.length > 0 && <div className="admin-main">
                    {
                        Books
                    }
                </div>}

            </div>
        </div>
    )
}
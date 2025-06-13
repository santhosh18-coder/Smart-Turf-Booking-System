import './Home.css'
import CommonHeader from './Header'
import { useNavigate } from 'react-router-dom'
import { LuCalendarSearch } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { IoFootballOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function Home() {
    const navigate = useNavigate()
    const location = useLocation()
    const { userDetails } = location.state || ''

    useEffect(() => {
        if (userDetails && userDetails.isLogin) {
            const welcomeShown = sessionStorage.getItem('welcome') || false
            if (!welcomeShown) {
                alert(`Welcome ${userDetails.username}`)
                sessionStorage.setItem('welcome', false)
            }
        }
    }, [userDetails])

    function handleBookingLogin() {
        const userLogin = localStorage.getItem('loggedInUser')
        userLogin && userLogin ? navigate('/booking') : navigate('/login')
    }

    function handleListingLogin() {
        const adminLogin = localStorage.getItem('loggedInAdmin') || null
        adminLogin && adminLogin ? navigate('/admin') : navigate('/admin_login')
    }

    return (
        <div className='home-wrapper'>
            <main>
                <CommonHeader />
                <div className='box-1'>
                    <h1>Book</h1>
                    <h1>Your Turf</h1>
                    <h1>Play Your Game</h1>
                    <div style={{ display: 'flex', width: '300px', height: '100px', justifyContent: 'space-between', alignItems: 'center', gap: '10px   ' }}>
                        <button onClick={handleBookingLogin} className='booking-button'>To Book A Venue</button>
                        <button onClick={handleListingLogin} className='listing-button'>To Get Listed</button>
                    </div>
                </div>
                <div className='box-2'>
                    <h2>Find the best sports turfs near you and book instantly. Enjoy hassle-free reservations with real-time availability.</h2>
                </div>
            </main>
            <div className='icons-info'>
                <div className='boxes'>
                    <LuCalendarSearch size={45} style={{ color: '#007bff' }} />
                    <h2>Search</h2>
                    <p>Are you looking to play after work, organize your Sunday Five's football match? Explore the largest network of sports facilities whole over the India</p>
                </div>
                <div className='boxes'>
                    <SlCalender size={45} style={{ color: '#007bff' }} />
                    <h2>Book</h2>
                    <p>Once you’ve found the perfect ground, court or gym, Connect with the venue through the Book Now Button to make online booking & secure easier payment</p>
                </div>
                <div className='boxes'>
                    <IoFootballOutline size={45} style={{ color: '#007bff' }} />
                    <h2>Play</h2>
                    <p>You’re the hero, you’ve found a stunning turf or court, booked with ease and now its time to play. The scene is set for your epic match.</p>
                </div>
            </div>
            <div className='why-us'>
                <h1>Why Us ?</h1>
                <div className='tick'>
                    <TiTick size={32} color='green' />
                    <h2>Instant Booking</h2>
                </div>
                <div className='tick'>
                    <TiTick size={32} color='green' />
                    <h2>Flexible Timings</h2>
                </div>
                <div className='tick'>
                    <TiTick size={32} color='green' />
                    <h2>Easy Payments </h2>
                </div>
            </div>
        </div>
    )
}
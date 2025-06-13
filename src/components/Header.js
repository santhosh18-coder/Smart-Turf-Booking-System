import { useEffect } from "react"
import { useState } from "react"
import { Menu } from "lucide-react"
import './header.css'
import { useNavigate } from "react-router-dom"

export default function CommonHeader() {
    const [showButton, setShowButton] = useState(false)
    const [menuButton, setMenuButton] = useState(false)

    const navigate=useNavigate()

    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 300) {
                setShowButton(true)
            }
            else {
                setShowButton(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    function handleMenu() {
        setMenuButton(!menuButton)
    }

    function handleBookingLogin() {
        const userLogin = localStorage.getItem('loggedInUser')
        userLogin && userLogin ? navigate('/booking') : navigate('/login')
    }


    return (
        <div>
            <header className={showButton ? 'header on' : 'header'}>
                <h2 className='header-left-section'>BookATurf</h2>
                <div className='header-right-section'>
                    <button className='booking-button-2' onClick={handleBookingLogin} style={{ visibility: showButton ? 'visible' : 'hidden' }}>Book Your Spot</button>
                </div>
            </header>
            <nav style={{visibility:menuButton?'visible':'hidden'}} className={`nav ${menuButton?'open':''}`}>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Book Now</li>
                        <li>News and Events</li>
                        <li>Blogs</li>
                    </ul>
                </nav>
            <Menu size={36} className='menu-button' onClick={handleMenu}/>
        </div>
    )
} 
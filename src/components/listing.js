import './listing.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export default function Listing() {



    const [turf, setTurf] = useState({
        name: '',
        venue: '',
        contact: '',
        booking_number: '',
        email: '',
        location: '',
        logo: '',
        price: '',
        turfImages: []
    })

    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        if (turf.name && turf.venue && turf.contact && turf.booking_number && turf.email && turf.location && turf.logo && turf.price && turf.turfImages.length >= 2) {

            const existingTurfs = JSON.parse(localStorage.getItem("turfs")) || [];
            const updatedTurfs = [...existingTurfs, turf]
            localStorage.setItem('turfs', JSON.stringify(updatedTurfs))

            const admin = localStorage.getItem('loggedInAdmin')
            const admins = JSON.parse(localStorage.getItem('admin_details'))

            const updatedAdmins = admins.map((adminItem) => {
                if (adminItem.username === admin) {
                    return {
                        ...adminItem,
                        venue: turf.venue
                    }
                }
                else {
                    return adminItem
                }
            })
            localStorage.setItem('admin_details', JSON.stringify(updatedAdmins))

            localStorage.setItem('loggedInAdmin', JSON.stringify({ username: admin, venue: turf.venue }))

            setTurf({
                name: '',
                venue: '',
                contact: '',
                booking_number: '',
                email: '',
                location: '',
                logo: '',
                price: '',
                turfImages: []
            })
            document.getElementById('logoUpload').value = ''
            document.getElementById('imageUpload').value = ''
            toast.success('Turf Added Successfully')

            setTimeout(() => {
                navigate('/admin')
            }, 2000)

        } else {
            toast.error('Insufficient Data !')
        }
    }

    function handleChange(e) {
        setTurf({
            ...turf,
            [e.target.name]: e.target.value
        })
    }


    function handleLogo(e) {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => {
                setTurf((prev) => {
                    return {
                        ...prev,
                        logo: reader.result
                    }
                })
            }
        }
    }

    function handleImages(e) {
        const files = Array.from(e.target.files)
        const images = []

        files.forEach((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => {
                images.push(reader.result)
                if (files.length === images.length) {
                    setTurf((prev) => {
                        return {
                            ...prev,
                            turfImages: images
                        }
                    })
                }
            }
        })
    }

    return (
        <div className='listing-wrapper'>
            <div className='listing-header'>
                <h2>BookATruf</h2>
            </div>
            <div className="listing-image">
                <h1>PARTNER WITH US</h1>
            </div>
            <div>
                <h1>START YOUR JOURNEY WITH PLAYSPOTS</h1>
                <h3>Partnership form</h3>
            </div>
            <form className='turf-details' onSubmit={(e) => { handleSubmit(e) }}>
                <input type='text' name='name' value={turf.name} onChange={(e) => handleChange(e)} placeholder='Name' />
                <input type='text' name='venue' value={turf.venue} onChange={(e) => handleChange(e)} placeholder='Venue Name' />
                <input type='text' name='contact' value={turf.contact} onChange={(e) => handleChange(e)} placeholder='Contact Number' />
                <input type='text' name='booking_number' value={turf.booking_number} onChange={(e) => handleChange(e)} placeholder='Booking Number' />
                <input type='text' name='email' value={turf.email} onChange={(e) => handleChange(e)} placeholder='Email Id' />
                <input type='text' name='location' value={turf.location} onChange={(e) => handleChange(e)} placeholder='Location' />
                <input type='text' name='price' value={turf.price} onChange={(e) => handleChange(e)} placeholder='price' />
                <label for='logoUpload'>Logo :
                    <input type='file' accept='image/*' onChange={(e) => { handleLogo(e) }} className='add-file' id='logoUpload' />
                </label>
                <label for='imageUpload'>Turf Images:
                    <input type='file' accept='image.*' multiple onChange={(e) => { handleImages(e) }} className='add-file' id='imageUpload' />
                </label>
                <button type='submit' className='submit-button'>Add Turf</button>
            </form>
            <ToastContainer />
        </div>
    )
}
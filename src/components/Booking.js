import { AiFillEnvironment } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { GoPersonFill } from "react-icons/go";
import Grounds from "./Ground-list";
import { useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import './Booking.css'
import { useState } from "react";
import { useEffect } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";


export default function Booking() {

    const [storedTurfs, setStoredTurfs] = useState('')

    useEffect(() => {
        setStoredTurfs(JSON.parse(localStorage.getItem('turfs')))
    }, [])

    const navigate = useNavigate();

    return (
        <div className="booking-page">
            <header>
                <div className="header-location">
                    <MdOutlineArrowBackIosNew size={32} onClick={()=>{navigate('/')}} style={{ cursor: 'pointer', color: 'gray' }}/>
                    <AiFillEnvironment size={32} style={{ cursor: 'pointer', color: 'gray' }} />
                    <p style={{ color: '#BBBBBB' }}>Madurai</p>
                </div>
                <div className="header-profile">
                    <CiSearch size={32} style={{ cursor: 'pointer', color: 'gray' }} onClick={() => { navigate('/search') }} />
                    <GoPersonFill style={{ cursor: 'pointer', color: 'gray' }} size={32} />
                    <IoMdHome size={32} style={{ cursor: 'pointer', color: 'gray' }} onClick={() => { navigate('/') }} />
                </div>
            </header>
            <div className="booking-main">
                {
                    storedTurfs && storedTurfs.length > 0 ? storedTurfs.map((singleTurf, index) => {
                        return <Grounds key={index} turfData={singleTurf} className='single-grounds' />
                    }) : <div style={{width:'100vw'}}> <h1 style={{ color: 'white', fontSize: '4rem' }}>No Turfs Founds</h1></div>
                }
            </div>
        </div>
    )
}
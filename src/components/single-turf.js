import { IoHomeOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import ImageSlider from "./ImageSlider";
import { FaPhoneFlip } from "react-icons/fa6";
import './single-turf.css'
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

export default function SingleTurf() {

    const navigate = useNavigate()

    const location = useLocation();

    const { turfData } = location.state || {};

    function handleBooking() {
        navigate('/booking-details', { state: { turfData } })
    }

    console.log(turfData)

    return (
        <div className="turf-wrapper">
            <div className="turf-header">
                <MdOutlineArrowBackIosNew size={32} onClick={() => { navigate('/booking') }} style={{ cursor: 'pointer', color: '#888888' }} />
                <IoHomeOutline size={40} color="#888888" />
            </div>
            <div className="main-wrapper">
                <ImageSlider images={turfData.turfImages} />
            </div>
            <div className="turf-disp">
                <div className="turf-name">
                    <h2>{turfData.name}</h2>
                    <button onClick={handleBooking}>Book Now</button>
                </div>
                <h2 style={{ color: '#FFFFFF' }}>Address</h2>
                <div className='turf-location'>
                    <div>
                        <h4>{turfData.location}</h4>
                    </div>
                    <FaPhoneFlip size={32} color="#888888" />
                </div>
            </div>
        </div>
    )
}
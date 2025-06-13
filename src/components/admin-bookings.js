import { FaUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { IoMdTime } from "react-icons/io";


export default function AdminBooking({myBooking}){
    return(
        <div className='booking-card'>
                    <div className='booking-name'>
                        <FaUser color="#6C5B7B"/>
                        <p>{myBooking.name}</p>
                    </div>
                    <div className='booking-mobile'>
                        <FaPhoneAlt color="#6C5B7B" />
                        <p>{myBooking.mobile}</p>
                    </div>
                    <div className='booking-email'>
                        <MdOutlineEmail color="#6C5B7B"/>
                        <p>{myBooking.email}</p>
                    </div>
                    <div className='booking-date'>
                        <MdDateRange color="#6C5B7B"/>
                        <p>{myBooking.selectedDate}</p>
                    </div>
                    <div className='booking-timing'>
                        <IoMdTime color="#6C5B7B"/>
                        <p>{`${myBooking.startTime}--${myBooking.endTime}`}</p>
                    </div>
                </div>
    )
}
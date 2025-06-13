import { useNavigate } from "react-router-dom";

export default function Grounds({turfData}){
    const navigate=useNavigate()
    function handleBookNow(){
        navigate('/single-turf',{state:{turfData}})
    }
    console.log(turfData)
    return(
        <div className="ground-container">
                    <img src={turfData.logo} alt="turf" />
                    <div className="content">
                        <div className="content-heading">
                            <h3 style={{fontFamily:'Poppins'}}>{turfData.venue}</h3>
                            <p style={{fontSize:'0.95rem',fontWeight:'400',color:'#BBBBBB',margin:'0px'}}>{turfData.location}</p>
                            <p style={{color:'white',margin:'0px'}}>Price : ₹{turfData.price}/hr</p>
                        </div>
                    </div>
                    <button onClick={handleBookNow} >Book Now {'> >'}</button>
                </div>
    )
}
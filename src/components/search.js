import { FaArrowLeft } from "react-icons/fa";
import './search.css'
import { useNavigate } from "react-router-dom";

export default function Search() {

    const navigate = useNavigate()
    return (
        <div className="search-page">
            <div className="search-header">
                <div className="search-bar-container">
                    <FaArrowLeft size={20} className="search-arrow" style={{cursor:'pointer'}} onClick={()=>{navigate('/booking')}}/>
                    <input type="text" placeholder="Search for turfs"  className="search-input"/>
                </div>
            </div>
            <div className="search-main">
                <h1>Explore More Sports</h1>
            </div>
        </div>
    )
}
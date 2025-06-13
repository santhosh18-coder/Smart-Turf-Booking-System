import { FaUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useState } from "react";
import { Link } from "react-router-dom";
import './user_login.css'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export default function Login() {
    const [userDetails, setUserDetails] = useState({
        username: '',
        password: '',
    })

    const navigate = useNavigate()

    useEffect(() => {
        const isLogged=localStorage.getItem('loggedInUser')||null
        if (isLogged) {
            navigate('/booking')
        }
    }, [userDetails, navigate])


    function handleChange(e) {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        })
    }

    function handleLogin() {
        const storedUsers = JSON.parse(localStorage.getItem('user_details')) || []
        const loggedInUser = storedUsers.find((userObj) =>
            userObj.username === userDetails.username && userObj.password === userDetails.password
        )
        console.log(loggedInUser)
        if (loggedInUser) {
            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
            toast.success('Login Successfull')
            setTimeout(()=>{
                navigate('/booking')
            },2500)
        }
        else {
            toast.error('Invalid Username and Password')
        }
    }

    return (
        <div className="user-login-wrapper">
            <div className="login-header">
                <FaArrowLeftLong color="white" size={32} style={{ marginLeft: '10px',cursor:'pointer' }} onClick={()=>{navigate('/')}}/>
            </div>
            <div className="login-content">
                <div class="profile-icon">
                    <FaUserCircle size={40} color="white" />
                </div>
                <h2 style={{color:'white'}}>User Login</h2>
                <div className="userName">
                    <FaUser style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', width: '10%', height: '100%', padding: '10px' }} />
                    <input type="text" name="username" value={userDetails.username} onChange={handleChange} placeholder="UserName" required />
                </div>
                <div className="password">
                    <RiLockPasswordFill style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', width: '10%', height: '100%', padding: '10px' }} />
                    <input type="text" name='password' value={userDetails.password} onChange={handleChange} placeholder="Password" required />
                </div>
                <div className="toRegister">
                    <Link to='/register'>Do Not Have An Account ?</Link>
                </div>
                <button onClick={handleLogin}>LOGIN</button>
            </div>
            <ToastContainer/>
        </div>
    )
}
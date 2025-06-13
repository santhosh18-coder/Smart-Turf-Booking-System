import { FaUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useState } from "react";
import { Link } from "react-router-dom";
import './admin_register.css'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export default function AdminRegister() {
    const [userDetails, setUserDetails] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    function handleChange(e) {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        })
    }

    function ValidateUsername(username) {
        const usernameRegex = /^[a-zA-Z0-9_]{4,}$/;
        return usernameRegex.test(username)
    }

    function ValidatePassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return passwordRegex.test(password)
    }

    function handleRegister() {
        const newErrors = {}

        if (!ValidateUsername(userDetails.username)) {
            newErrors.username='Username Must be at least 4 character and only contains letter, numbers and _'
        }

        if (userDetails.username&&!ValidatePassword(userDetails.password)) {
            newErrors.password='Password must be 8 character and should include Uppercase, LowerCase, Number and Special Character'
        }

        if (userDetails.password&&userDetails.password !== userDetails.confirmPassword) {
            newErrors.confirmPassword='Password and Confirm Password does not match'
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            const userNames = JSON.parse(localStorage.getItem('admin_details')) || []
            localStorage.setItem('admin_details', JSON.stringify([
                ...userNames,
                {
                    username: userDetails.username,
                    password: userDetails.confirmPassword
                }
            ]))
            toast.success('Registered Successfully')
            setTimeout(()=>{
                navigate('/admin_login')
            },2500)
        }
    }

    return (
        <div className="user-wrapper">
            <div className="login-header">
                <FaArrowLeftLong color="white" size={32} style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => { navigate('/admin_login') }} />
            </div>
            <div className="login-content">
                <div class="profile-icon">
                    <FaUserCircle size={40} color="white" />
                </div>
                <h2 style={{ color: 'white' }}>Admin Register</h2>
                <div className="userName">
                    <FaUser style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', width: '10%', height: '100%', padding: '10px' }} />
                    <input type="text" name="username" value={userDetails.username} onChange={handleChange} placeholder="UserName" required />
                </div>
                {errors.username&&<p className="admin-register-error">{errors.username}</p>}
                <div className="password">
                    <RiLockPasswordFill style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', width: '10%', height: '100%', padding: '10px' }} />
                    <input type="text" name='password' value={userDetails.password} onChange={handleChange} placeholder="Password" required />
                </div>
                {errors.password&&<p className="admin-register-error">{errors.password}</p>}
                <div className="password">
                    <RiLockPasswordFill style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', width: '10%', height: '100%', padding: '10px' }} />
                    <input type="text" name='confirmPassword' value={userDetails.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
                </div>
                {errors.confirmPassword&&<p className="admin-register-error">{errors.confirmPassword}</p>}
                <div className="toRegister">
                    <Link to='/admin_login'>Already have an account ?</Link>
                </div>
                <button onClick={handleRegister}>REGISTER</button>
            </div>
            <ToastContainer/>
        </div>
    )
}
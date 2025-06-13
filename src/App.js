import Home from './components/Home.js';
import Listing from './components/listing.js';
import Booking from './components/Booking.js';
import Login from './components/user_login.js';
import SingleTurf from './components/single-turf.js';
import Search from './components/search.js';
import BookingDetails from './components/turf-booking.js';
import Register from './components/user_register.js';
import Admin from './components/admin.js';
import AdminLogin from './components/admin_login.js';
import AdminRegister from './components/admin_register.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/booking' element={<Booking />} />
        <Route path='/listing' element={<Listing />} />
        <Route path='/single-turf' element={<SingleTurf />}/>
        <Route path='/search' element={<Search />}/>
        <Route path='/booking-details' element={<BookingDetails/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/admin_login' element={<AdminLogin/>}/>
        <Route path='/admin_register' element={<AdminRegister/>}/>
      </Routes>
    </Router>
  )
}
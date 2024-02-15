import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import Register from "./pages/Register";
import BookingBike from "./pages/BookingBike";
import 'antd/dist/reset.css';
import UserBookings from "./pages/UserBookings";
import AddBike from "./pages/AddBike";
import AdminHome from "./pages/AdminHome";
import EditBike from "./pages/EditBike";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route
            path='/'
            element={localStorage.getItem('user') ? <Home /> : <Navigate to='/login' />}
          />
          <Route path='/login' element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/booking/:bikeid" element={<BookingBike />} />
            <Route
            path="/userbookings" element={<UserBookings />} />
            <Route
            path="/addbike" element={<AddBike />} />
            <Route
            path="/admin" element={<AdminHome />} />
            <Route
            path="/editbike/:bikeid" element={<EditBike />} />
            {/*  element={localStorage.getItem('user') ? <BookingBike /> : <Navigate to='/login' />} */}
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// export function ProtectedRoute(props)
// {


//     if(localStorage.getItem('user'))
//     {
//       return <Route {...props}/>
//     }
//     else{
//       return <Navigate to='/login'/>
//     }

// }
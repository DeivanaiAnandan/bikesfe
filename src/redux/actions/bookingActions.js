import axios from "axios";
import { message } from "antd";

export const bookBike=(reqObj)=>async dispatch=>{
    dispatch({type: 'LOADING' , payload:true});

    try {
        await axios.post('https://devbikes-tyne.onrender.com/api/bookings/bookbike', reqObj)
        
        dispatch({type: 'LOADING' , payload:false})
        message.success("Your bike booked successfully")
        setTimeout(() => {
            window.location.href='/userbookings'
          }, 500);
    } catch (error) {
        console.log(error)
        dispatch({type: 'LOADING' , payload:false})
        message.error("Something went wrong please try again later")
    }
}
export const getAllBookings=()=>async dispatch=>{
    dispatch({type: 'LOADING' , payload:true})

    try {
        const response = await axios.get('https://devbikes-tyne.onrender.com/api/bookings/getallbookings')
        dispatch({type: 'GET_ALL_BOOKINGS', payload:response.data})
        dispatch({type: 'LOADING' , payload:false})
    } catch (error) {
        console.log(error)
        dispatch({type: 'LOADING' , payload:false})
    }
}

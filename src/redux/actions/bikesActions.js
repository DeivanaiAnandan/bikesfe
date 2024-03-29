import axios from "axios";
import { message } from 'antd';


export const getAllBikes=()=>async dispatch=>{
    dispatch({type: 'LOADING' , payload:true})

    try {
        const response = await axios.get('https://devbikes-tyne.onrender.com/api/bikes/getallbikes')
        dispatch({type: 'GET_ALL_BIKES', payload:response.data})
        dispatch({type: 'LOADING' , payload:false})
    } catch (error) {
        console.log(error)
        dispatch({type: 'LOADING' , payload:false})
    }
}

export const addBike=(reqObj)=>async dispatch=>{
    dispatch({type: 'LOADING' , payload:true})

    try {
         await axios.post('https://devbikes-tyne.onrender.com/api/bikes/addbike', reqObj)
        
        dispatch({type: 'LOADING' , payload:false})
        message.success('New Bike added succesfully')
        setTimeout(()=>{
                window.location.href='/admin'
        }, 500)
    } catch (error) {
        console.log(error)
        dispatch({type: 'LOADING' , payload:false})
    }
}

export const editBike=(reqObj)=>async dispatch=>{
    dispatch({type: 'LOADING' , payload:true})

    try {
         await axios.post('https://devbikes-tyne.onrender.com/api/bikes/editbike', reqObj)
        
        dispatch({type: 'LOADING' , payload:false})
        message.success('Bike updated successfully')
        setTimeout(()=>{
                window.location.href='/admin'
        }, 500)
    } catch (error) {
        console.log(error)
        dispatch({type: 'LOADING' , payload:false})
    }
}

export const deleteBike=(reqObj)=>async dispatch=>{
    dispatch({type: 'LOADING' , payload:true})

    try {
         await axios.post('https://devbikes-tyne.onrender.com/api/bikes/deletebike', reqObj)
        
        dispatch({type: 'LOADING' , payload:false})
        message.success('Bike deleted successfully')
        setTimeout(()=>{
                window.location.reload();
        }, 500)
    } catch (error) {
        console.log(error)
        dispatch({type: 'LOADING' , payload:false})
    }
}

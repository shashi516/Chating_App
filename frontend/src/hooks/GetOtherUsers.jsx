import axios from 'axios'
import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import {setOtherUsers} from '../redux/userSlice'

const GetOtherUsers=() =>{

    const dispatch= useDispatch()

useEffect(()=>{
    const fetchOtherUser=async ()=>{
        try {
            axios.defaults.withCredentials=true;
            const res= await axios.get(`http://localhost:5001/api/v1/user/`)
            console.log(res)
            dispatch(setOtherUsers(res.data));
        } catch (error) {
            console.log(error)
        }
    }
    fetchOtherUser();
},[])
}

export default GetOtherUsers

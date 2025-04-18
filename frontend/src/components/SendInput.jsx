import axios from 'axios';
import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '../main';

function SendInput() {
  
  const [message,setMessage]=useState("");
  const dispatch=useDispatch();
  const {selectedUser}=useSelector(store=>store.user);
  const {messages} = useSelector(store=>store.message);
  
  const onSubmitHandler= async (e)=>{
    e.preventDefault();
    try {
      
      const res = await axios.post(`${BASE_URL}/api/v1/message/send/${selectedUser?._id}`,{message},{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
      dispatch(setMessages([...messages,res?.data?.newMessage]))
      console.log(res);
    } catch (error) {
      console.log(error)
    }
    setMessage("");
  }


  return (
    <div>
      <form onSubmit={onSubmitHandler}  action="" >
        <div className='w-full relative'>
        <input 
        type="text"
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        placeholder='Message'
        className='border text-sm rounded-full block w-full p-3 ' />
        <button type='submit' className='absolute flex inset-y-0 end-0 items-center pr-4  '>
            <IoSend/>
        </button>
        </div>

      </form>
    </div>
  )
}

export default SendInput

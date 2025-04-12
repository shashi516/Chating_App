import React, { useEffect } from 'react'
import SendInput from './SendInput.jsx'
import Messages from './Messages.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice.js';

function MessageContainer() {
  const { selectedUser , authUser} = useSelector(store => store.user);
  
  const dispatch =useDispatch();
  useEffect(()=>{
    return ()=>dispatch(setSelectedUser(null));
  },[])

  return (
    <>
      {
        selectedUser !== null ? (
      <div className='md:min-w-[550px] sm:min-w-[650px] flex-1 flex-col  ml-3 '>
        <div className=' flex gap-2 items-center bg-gray-200 rounded-md px-3 py-2 mb-2 text-slate-700'>
          <div>
            <div className='w-12 rounded-full'>
              <img src={selectedUser?.profilePhoto} alt="" />
            </div>
          </div>
          <div className='flex flex-col flex-1'>
            <div className='flex justify-between gap-2 '>
              <p>{selectedUser?.fullName}</p>
            </div>
          </div>
        </div>
        <Messages />
        <SendInput />
      </div>
      ):(
      <div class="md:min-w-[550px] justify-center items-center flex flex-col bg-slate-200">

        <h1 class="text-red-400 font-bold text-3xl">Hi, {authUser?.fullName} </h1>
        <h1  class="text-black-400 font-bold text-3xl">Let's Start Chat</h1>

      </div>
      )
    }
    </>
  )
}

export default MessageContainer

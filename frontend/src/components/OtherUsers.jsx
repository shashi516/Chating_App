import React from 'react'
import GetOtherUsers from '../hooks/GetOtherUsers.jsx'
import OtherUser from './OtherUser.jsx';
import { useSelector } from 'react-redux';

function OtherUsers() {
    GetOtherUsers();
    const {otherUser}=useSelector(store=>store.user);
    if(!otherUser){
      return
    }
  return (
    <div className='overflow-auto flex-1'>

      {
        otherUser?.map((user)=>{
          return (
            <OtherUser key={user._id} user={user}/>
          )
        })
      }
    </div>
  )
}

export default OtherUsers

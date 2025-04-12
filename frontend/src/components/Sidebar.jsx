import React, { useState } from 'react'
import { ImSearch } from "react-icons/im";
import toast from 'react-hot-toast'
import OtherUsers from './OtherUsers';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setOtherUsers } from '../redux/userSlice';

function Sidebar() {

  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { otherUser } = useSelector(store => store.user);

  const LogoutHandle = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/v1/user/logout`)
      toast.success(res.data.message);
      navigate("/login");
      dispatch(setAuthUser(null));
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const SearchHandler = (e) => {
    e.preventDefault();
    const conversationUser = otherUser?.find((user) => user.fullName.toLowerCase().includes(search.toLowerCase()));
    if (conversationUser) {
      dispatch(setOtherUsers([conversationUser]));
    } else {
      toast.error("User not found!");
    }
  }


  return (
    <div className='border-r border-blue-100  p-2 flex flex-col '>
      <form onSubmit={SearchHandler} action="" className='flex items-center '>
        <input type="text"
         value={search}
         onChange={(e)=>setSearch(e.target.value)}
         className='input input-bordered rounded-full' placeholder='Search...' />
        <button type='submit' className='btn btn-circle bg-zinc-100 '>
          <ImSearch className='w-6 h-6 outlin-none' />
        </button>
      </form>
      <div className="divider px-3"></div>
      <OtherUsers />
      <div className='my-2 justify-end flex'>
        <button onClick={LogoutHandle} className='btn btn-sm'>
          logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar

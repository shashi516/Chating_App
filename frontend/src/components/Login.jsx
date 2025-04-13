import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import { setAuthUser } from '../redux/userSlice';
import { BASE_URL } from '../main';

function Login() {

 const [user, setUser] = useState({
    userName: "",
    password: "",
    
  })

  const navigate=useNavigate();
  const dispatch=useDispatch();

  const OnsubmitHandler = async (e) => {
    e.preventDefault();
   try {
    await axios.post(`${BASE_URL}/api/v1/user/login`,user,
     { headers:{
        "Content-Type":"application/json"
      },
      withCredentials:true
    })
    .then((res)=>{
      navigate("/")
      dispatch(setAuthUser(res.data));
    })
   } catch (error) {
    toast.error(error.response.data.message)
   }
    setUser({
      userName: "",
      password: "",
      
    })
  }


  return (
    <div className='min-w-100 mx-auto'>
      <div className=' p-6 h-full w-full bg-green-100 rounded-md bg-clip-padding shadow-gray-900 shadow-2xl  bg-opacity-10 border border-gray-100'>
        <h1 className='text-3xl font-bold text-center text-black-300 mb-4'>Login</h1>
        <hr />
        <form onSubmit={OnsubmitHandler} action="">
        <div className='mt-5'>
          <input type="text"  value={user.userName} onChange={(e) => setUser({ ...user, userName: e.target.value })}
           class="w-full input input-borderd h-10" placeholder='User Name' />
        </div>
        <div className='mt-5'>
          <input type="text"   value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
          class="w-full input input-borderd h-10" placeholder='Password' />
        </div>
        <div class="justify-end flex my-5">
       <p>
        Don't have any account? <Link to="/register" class="text-blue-800">
        SignUP
        </Link>
       </p>
        </div>
        <div>
          <button type='submit' class="btn btn-info w-full my-3 hover:opacity-10 transition duration-800">Login</button>
        </div>
        </form>

      </div>
    </div>
  )
}

export default Login;

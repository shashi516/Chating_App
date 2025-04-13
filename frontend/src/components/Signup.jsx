import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BASE_URL } from '..';

function Signup() {

  const [user, setUser] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: ""
  })

  const navigate =useNavigate()

  const OnsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/v1/user/register`,user,{
        headers:{
          "Content-Type": "application/json"
        },
        withCredentials:true  
      })
      .then((res)=>{
        navigate("/login")
        toast.success(res.data.message)
      })
    }
      catch (error) {
        toast.error(error.response.data.message);
    }
    setUser({
      fullName: "",
      userName: "",
      password: "",
      confirmpassword: "",
      gender: ""
    })
  }

  const genderHadler = (gender) => {
    setUser({ ...user, gender })
    
  }

  return (
    <div className='min-w-100 mx-auto'>
      <div className=' p-6 h-full w-full bg-green-100 rounded-md bg-clip-padding shadow-gray-900 shadow-2xl  bg-opacity-10 border border-gray-100'>
        <h1 className='text-3xl font-bold text-center text-black-300 mb-4'>SignUp</h1>
        <hr />
        <form onSubmit={OnsubmitHandler} action="">
          <div className='mt-5'>
            <input type="text" value={user.fullName} onChange={(e) => setUser({ ...user, fullName:e.target.value })}
              class="w-full input input-borderd h-10 " placeholder='Full Name' />
          </div>
          <div className='mt-5'>
            <input type="text" value={user.userName} onChange={(e) => setUser({ ...user, userName:e.target.value })}
              class="w-full input input-borderd h-10" placeholder='User Name' />
          </div>
          <div className='mt-5'>
            <input type="text" value={user.password} onChange={(e) => setUser({ ...user, password:e.target.value })}
              class="w-full input input-borderd h-10" placeholder='Password' />
          </div>
          <div className='mt-5'>
            <input type="text" value={user.confirmpassword} onChange={(e) => setUser({ ...user, confirmpassword:e.target.value })}
              class="w-full input input-borderd h-10" placeholder='Confirm Password' />
          </div>
          <div class="flex items-center justify-center gap-2 my-5">
            <div class="flex items-center">
              <p>Male</p> &nbsp; &nbsp;
              <input type="radio"
                name='gender'
                checked={user.gender === "male"}
                onChange={() => genderHadler("male")}
                className="radio radio-primary" />
            </div>
            <div class="flex items-center">
              <p>Female</p> &nbsp; &nbsp;
              <input type="radio"
                name='gender'
                checked={user.gender === "female"}
                onChange={() => genderHadler("female")} 
                className="radio radio-secondary" />
            </div>
          </div>
          <div class="justify-end flex">
            <p>
              Already have an account? <Link to="/login" class="text-blue-800">
                Login
              </Link>
            </p>
          </div>
          <div>
            <button type='submit' class="btn btn-info w-full my-3 hover:opacity-10 transition duration-800">SignUp</button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Signup;

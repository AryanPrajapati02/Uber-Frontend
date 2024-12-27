import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
// import { UserDataContext } from '../context/userContext'
import { UserDataContext } from '../context/UserContext'

import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function UserLogin() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // const [userData , setUserData] = useState({})
  const { user, setUser , storeToken} = useContext(UserDataContext)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')


  const submitHandler = async(e) =>{
    e.preventDefault()
    if(email === "" || password === ""){
      return toast.error("Please fill all the fields")
    }

    const userData = {
      email: email,
      password: password
    }
    try{
      const response = await toast.promise(
        axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData),
        {
          loading: 'Logging in...',
          success: 'Logged in successfully',
          error: 'An error occurred while logging in',
        }

      )
      if(response.status === 200){
        navigate('/home')
        const data = response.data
        storeToken(data.token)
        setUser(data.user)
        
              setEmail("")
              setPassword("")
            }
    }catch(err){
      if (err.response && err.response.data.errors) {
        toast.error(err.response.data.errors[0].msg);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    }
    
   
  }

  useEffect(()=>{
    if(token){
      navigate('/home')
  }},[token])
  return (
    <div>

      <div className='p-7 flex flex-col h-screen justify-between'>
        <div>
          <img className='w-16 mb-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
          <form onSubmit={(e)=>{
            submitHandler(e)
          }} noValidate >
            <h3 className='text-lg font-medium mb-2'>What's Your Email</h3>
            <input required type="email"  
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
          
            placeholder='email@example.com' className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' />
            <h3 className='text-lg font-medium mb-2' >Enter Password</h3>
            <input required type="password" 
            
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            placeholder='Password' className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' />

            <button className='bg-[#111] text-white font-semibold mb-4 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Login</button>
          </form>
          <p className='mb-4'>Don't have an Account ? <Link to='/signup' className='text-blue-500'>Create new Account</Link>
          </p>
        </div>
        <div>
        <Link to='/captain-login '>  <button className='bg-[#10b461] text-white    font-semibold mb-16 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Sign in as Captain</button>

        </Link>
        </div>
      </div>
    </div>
  )
}

export default UserLogin

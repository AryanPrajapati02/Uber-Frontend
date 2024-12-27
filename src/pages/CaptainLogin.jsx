import React, { useContext, useState ,useEffect } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

function CaptainLogin() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
 
  const [checkToken , setCheckToken] = useState("")

  const { captain, setCaptain , storeToken} = useContext(CaptainDataContext)

  
  const navigate = useNavigate()

  const submitHandler = async(e) =>{
    e.preventDefault()
    if(email === "" || password === ""){
      return toast.error("Please fill all the fields")
    }

    const CaptainData = {
      email: email,
      password: password
    }
    
    try{
      const response = await toast.promise(
        axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, CaptainData),
        {
          loading: 'Logging in...',
          success: 'Logged in successfully',
          error: 'Invalid email or password',
         
        }

      )
      if(response.status === 200){
        navigate('/captain-home')
        const data = response.data
        storeToken(data.token)
        

        setCaptain(data.user)
        
              setEmail("")
              setPassword("")
            }
    }catch(err){
      if (err.response && err.response.data.errors) {
        toast.error(err.response.data.errors[0].msg);
      } 

    }
    
   
  }
  useEffect(()=>{
    if(localStorage.getItem('token')){
      
      navigate('/captain-home')
    }
    },[])
 
  

  return (
  
    <>
    
  

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
          <p className='mb-4 text-center'>Join a Fleet ? <Link to='/captain-signup' className='text-blue-500'>Register as Captain</Link>
          </p>
        </div>
        <div>
        <Link to='/login '>  <button className='bg-[#d5622d] text-white    font-semibold mb-16 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Sign in as User</button>

        </Link>
        </div>
      </div>
    </>
  )
}

export default CaptainLogin
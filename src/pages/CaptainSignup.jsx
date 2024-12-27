import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

function CaptainSignup() {
  const { captain, setCaptain , storeToken} = useContext(CaptainDataContext)

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [firstname, setFirstname] = useState('')
const [lastname, setLastname] = useState('')
// const [captainData, setCaptainData] = useState({})
const [vehicleColor, setVehicleColor] = useState('')
const [vehiclePlate, setVehiclePlate] = useState('')
const [vehicleType, setVehicleType] = useState('')
const [vehicleCapacity, setVehicleCapacity] = useState('')

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const navigate = useNavigate()

const submitHandler = async(e) =>{
  e.preventDefault()
  const captainData = {
    email: email,
    password: password,
    fullname: {
      firstname: firstname,
      lastname: lastname
    },
    vehicle: {
      color: vehicleColor,
      plate: vehiclePlate,
      vehicleType: vehicleType,
      capacity: vehicleCapacity

    }}
    if(email === "" || password === "" || firstname === "" || lastname === "" || vehicleColor === "" || vehiclePlate === "" || vehicleType === "" || vehicleCapacity === ""){
      return toast.error("Please fill all the fields")
    }
    if(!emailRegex.test(email)){
      return toast.error("Please enter a valid email")
    }
    if(!passwordRegex.test(password)){
      return toast.error("Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character")
    }
    
    try{
      const response =await toast.promise(
       axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData),
        {
          loading: 'Creating Account...',
          success: 'Account created successfully',
          error: 'An error occurred while creating account'
        }
      )
      if(response.status === 201){
        const data = response.data
        localStorage.setItem('token', data.token)
        setCaptain(data.captain)
        navigate('/captain-home')
        setEmail('')
        setPassword('')
        setFirstname('')
        setLastname('')
        setVehicleColor('')
        setVehiclePlate('')
        setVehicleType('')
        setVehicleCapacity('')
      }
    }
    catch(err){
      if (err.response && err.response.data.errors) {
        toast.error(err.response.data.errors[0].msg);
      } 
    }
  }

  return (
    <div>

    <div className='p-7 flex flex-col h-screen justify-between'>
      <div>
        <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <form onSubmit={(e)=>{
          submitHandler(e)
        }} noValidate >


          <h3 className='text-lg font-medium mb-2'>What's Your Name</h3>

          <div className='flex gap-2'>

          <input required type="text"    
          value={firstname}
          onChange={(e)=>{setFirstname(e.target.value)}}
          placeholder='Firstname' className='bg-[#eeeeee] w-1/2 mb-5 rounded px-4 py-2 border  text-lg placeholder:text-base' />

          <input type="text"   
          value={lastname}
          onChange={(e)=>{setLastname(e.target.value)}}

          placeholder='Lastname' className='bg-[#eeeeee] w-1/2 mb-5 rounded px-4 py-2 border  text-lg placeholder:text-base' />
          </div>


          <h3 className='text-lg font-medium mb-2'>What's Your Email</h3>
          <input required type="email"  
          value={email}
          onChange={(e)=>{
            setEmail(e.target.value)
          }} placeholder='email@example.com' className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base' />


          <h3 className='text-lg font-medium mb-2' >Enter Password</h3>
          <input required type="password" 
          value={password}
          onChange={(e)=>{
            setPassword(e.target.value)} }
          placeholder='Password' className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base' />


          <h3 className='text-lg font-medium mb-2'>Vehicle Details</h3>
          <div className='flex gap-2'>
            <input required type="text"    
            value={vehicleColor}
            onChange={(e)=>{setVehicleColor(e.target.value)}}
            placeholder='Vehicle Color' className='bg-[#eeeeee] w-1/2 mb-5 rounded px-4 py-2 border  text-lg placeholder:text-base' />

            <input required type="text"   
            value={vehiclePlate}
            onChange={(e)=>{setVehiclePlate(e.target.value)}}
            placeholder='MP07XXYYYY' className='bg-[#eeeeee] w-1/2 mb-5 rounded px-4 py-2 border  text-lg placeholder:text-base' />
          </div>

          <div className='flex gap-2'>
            <select required 
            value={vehicleType}
            onChange={(e)=>{setVehicleType(e.target.value)}}
            className='bg-[#eeeeee] w-1/2 mb-5 rounded px-4 py-2 border  text-lg placeholder:text-base'>
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="bike">Bike</option>
            </select>

            <input required type="number"   
            value={vehicleCapacity}
            onChange={(e)=>{setVehicleCapacity(e.target.value)}}
            placeholder='Vehicle Capacity' className='bg-[#eeeeee] w-1/2 mb-5 rounded px-4 py-2 border  text-lg placeholder:text-base' />
          </div>
          <button className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Create Captain Account </button>
        </form>
        <p className='mb-4 text-center'>Already have an Account ? <Link to='/captain-login' className='text-blue-500'>Login here</Link>
        </p>
      </div>
      <div>
      <Link to='/signup '>  <button className='bg-[#92d52d] text-white    font-semibold mb-16 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Sign in as User</button>

      </Link>
      </div>
    </div>
  </div>
  )
}

export default CaptainSignup
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function ConfirmRidePopup(props) {
  const navigate = useNavigate()

const [otp, setOtp] = useState('')

const submitHandler = async (e) => {
  e.preventDefault()
  console.log(props?.ride)

  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
      params: {
          rideId: props?.ride?._id,
          otp: otp
      },
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
  })

  if (response.status === 200) {
    console.log('ride started')
      props.setConfirmRidePopupPanel(false)
      props.setRidePopupPanel(false)
      navigate('/captain-riding', { state: { ride: props.ride } })
  }


}

  return (
    <div className=''>
    <div onClick={()=>{props.setRidePopupPanel(false)}} className='flex justify-between items-center'>

<h2 className='text-2xl font-bold  m-2 mb-5'>Confirm this ride to start</h2>
{/* <img className='w-10 mr-2 p-2' src="https://cdn-icons-png.flaticon.com/512/1828/1828939.png" alt="" /> */}

</div>
<div className='flex items-center justify-between p-3 bg-gray-100 rounded-lg' >
    <div className='flex items-center gap-3 '>
      <img className='w-14 h-14 rounded-full object-cover' src="https://www.uber-assets.com/image/upload/q_auto:eco,c_fill,h_638,w_956/v1565733741/assets/0f/9719ad-69a4-4c0d-9444-ce6d8c3f9759/original/Signup.svg" alt="" />  

      <h2 className='text-lg font-semibold   m-2'>Sanjay Patel</h2>
    </div>
    <h5 className='text-lg font-bold'>2.3 KM</h5>
</div>
<div className='flex gap-2 justify-between items-center flex-col'>

{/* <img className='h-[25vh]' src="https://i.pinimg.com/474x/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.jpg" alt="" /> */}
<div className='w-full flex flex-col gap-2 p-3'>
  <div className='font-bold text-xl border-b-2 p-2'> Location</div>
  <div className='font-bold text-xl   p-2 border-b-2'>Destination</div>
  <div className='font-bold p-2 text-xl border-b-2'> Amount</div>
 

</div>


<div className='w-[90%]'>
    <form onSubmit={submitHandler} >
    <input required type="number"    
          value={otp}
          onChange={(e)=>{setOtp(e.target.value)}}
          placeholder='OTP TO CONFIRM RIDE' className='bg-[#eeeeee] w-full mb-5 rounded px-4 py-2 border  text-lg placeholder:text-base' />

<div  className='w-full'>
<button onClick={()=>{
props.setConfirmRidePopupPanel(false)
props.setRidePopupPanel(false)

  
}} className='w-full rounded-xl px-3 py-3 bg-green-400 font-bold  mb-2 border-2 border-green-600 ' >CONFIRM</button>
</div>

    </form>
</div>

<div className='w-[90%]'>




<button onClick={()=>{

  props.setConfirmRidePopupPanel(false)
  props.setRidePopupPanel(false)

  
}} className='w-full rounded-xl px-3 py-3 bg-rose-300 border-2 border-rose-400 text-rose-700 font-bold  mb-2 ' >CANCEL RIDE</button>

</div>
</div>



    </div>
  )
}

export default ConfirmRidePopup
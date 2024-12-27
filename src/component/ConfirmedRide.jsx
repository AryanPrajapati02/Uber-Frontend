import React from 'react'

function ConfirmedRide(props) {
  return (
    <div className=''>
    <div onClick={()=>{props.setconfirmRidePanel(false)}} className='flex justify-between items-center'>

<h2 className='text-2xl font-bold  m-2'>Confirm Your Ride</h2>
<img className='w-10 mr-2 p-2' src="https://cdn-icons-png.flaticon.com/512/1828/1828939.png" alt="" />

</div>
<div className='flex gap-2 justify-between items-center flex-col'>

<img className='h-[25vh]' src="https://i.pinimg.com/474x/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.jpg" alt="" />
<div className='w-full flex flex-col gap-2 p-3'>
  {/* <div className='font-bold text-xl border-b-2 p-2'> Pickup : {props.pickup}</div> */}
<div className='w-full flex flex-col gap-2 p-3'>
  <div className='font-semibold text-lg border-b-2 p-2'> Pickup : {props.pickup}</div>
  <div className='font-semibold text-lg   p-2 border-b-2'>Destination : {props.destination}</div>
  <div className='font-semibold p-2 text-xl border-b-2'> Amount :  <span className='text-green-600 text-2xl'>
   ₹{props?.fare?.data?.[props?.vehicleType]} </span></div>
 
</div>
</div>
<button onClick={()=>{
  props.setVehicleFound(true)
  props.setconfirmRidePanel(false)
  props.createRide()
  
}} className='w-full rounded-xl px-3 py-2 bg-green-500 font-bold text-white mb-2 ' >Confirm</button>
</div>
    </div>
  )
}

export default ConfirmedRide
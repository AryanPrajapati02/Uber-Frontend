import React , {useState}from 'react'

function RidePopup(props) {



  return (
    <div>
    <div onClick={()=>{props.setRidePopupPanel(false)}} className='flex justify-between items-center'>

<h2 className='text-2xl font-bold  m-2'>New Ride Available !</h2>
<img className='w-10 mr-2 p-2' src="https://cdn-icons-png.flaticon.com/512/1828/1828939.png" alt="" />

</div>
<div className='flex items-center justify-between p-3 bg-gray-100 rounded-lg' >
    <div className='flex items-center gap-3 '>
      <img className='w-14 h-14 rounded-full object-cover' src="https://www.uber-assets.com/image/upload/q_auto:eco,c_fill,h_638,w_956/v1565733741/assets/0f/9719ad-69a4-4c0d-9444-ce6d8c3f9759/original/Signup.svg" alt="" />  

      <h2 className='text-lg font-semibold   m-2'>{props.ride?.user?.fullname.firstname + " " + props.ride?.user?.fullname.lastname}</h2>
    </div>
    <h5 className='text-lg font-bold'>{props.ride?.distance}</h5>
</div>
<div className='flex gap-2 justify-between items-center flex-col'>

{/* <img className='h-[25vh]' src="https://i.pinimg.com/474x/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.jpg" alt="" /> */}
<div className='w-full flex flex-col gap-2 p-3'>
  <div className='font-semibold text-lg border-b-2 p-2'> Pickup : {props.ride?.pickup
}</div>
  <div className='font-semibold text-lg  p-2 border-b-2'>Destination : {props.ride?.destination
  }</div>
  <div className='font-bold p-2 text-xl border-b-2'> Amount : <span className='font-semibold text-2xl text-green-500'> ₹{props.ride?.fare}</span></div>
 

</div>
<button onClick={()=>{
   props.setConfirmRidePopupPanel(true)
   props.confirmRide()
 
  
}} className='w-full rounded-xl px-3 py-3 bg-green-400 font-bold  mb-2 border-2 border-green-600 ' >ACCEPT</button>
<button onClick={()=>{

  props.setRidePopupPanel(false)
  
}} className='w-full rounded-xl px-3 py-3 bg-rose-300 border-2 border-rose-500 font-bold  mb-2 ' >IGNORE</button>
</div>
    </div>
  )
}

export default RidePopup
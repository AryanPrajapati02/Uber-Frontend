import React from 'react'


function VehiclePanel(props) {
  return (
    <div>

<div onClick={()=>{props.setVehiclePannel(false)}} className='flex justify-between items-center'>

<h2 className='text-2xl font-bold  m-2'>Choose a Vehicle</h2>
<img className='w-10 mr-2 p-2' src="https://cdn-icons-png.flaticon.com/512/1828/1828939.png" alt="" />

</div>
<div onClick={()=>{props.setconfirmRidePanel(true)

  props?.setVehicleType('car')
}} className='flex mb-2  items-center w-full border-2 border-black rounded-xl justify-center'>
<img className='h-[15vw] w-[25vw]'  src="https://www.asaproadworthys.com.au/wp-content/uploads/2021/11/Select.jpeg" alt="" />
<div className=' w-1/2 p-2 '>
<h4 className='font-medium text-xl flex  items-center '>Uber Go <span> <img className='w-4 mr-1 ml-1' src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png" alt="" /> </span> 4 </h4>
<h5 className='font-medium text-sm'>2 min away</h5>
<p className='font-medium text-sm'>Affordable ride</p>
</div>
<h2 className='text-2xl font-semibold  mr-2'>₹{props.fare?.data?.car}</h2>
</div>


<div onClick={()=>{props.setconfirmRidePanel(true)   
    props.setVehicleType('moto')
}}  className='flex  items-center mb-2 w-full border-2 hover:border-black rounded-xl justify-center'>
<img className='h-[15vw] w-[25vw]'  src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
<div className=' w-1/2 p-2 '>
<h4 className='font-medium text-xl flex  items-center '>Moto  <span> <img className='w-4 mr-1 ml-1' src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png" alt="" /> </span> 1 </h4>
<h5 className='font-medium text-sm'>3 min away</h5>
<p className='font-medium text-sm'>Affordable ride</p>
</div>
<h2 className='text-2xl font-semibold mr-2'>₹{props?.fare?.data?.moto}</h2>
</div>


<div  onClick={()=>{props.setconfirmRidePanel(true)
    props.setVehicleType('auto')
}}  className='flex  items-center mb-2 w-full border-2 hover:border-black rounded-xl justify-center'>
<img className='h-[15vw] w-[25vw]'  src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
<div className=' w-1/2 p-2 '>

<h4 className='font-medium text-xl flex  items-center '>Auto  <span> <img className='w-4 mr-1 ml-1' src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png" alt="" /> </span> 3 </h4>

<h5 className='font-medium text-sm'>1 min away</h5>
<p className='font-medium text-sm'>Affordable Auto ride</p>
</div>
<h2 className='text-2xl font-semibold mr-2'>₹{props?.fare?.data?.auto}</h2>
</div>
    </div>
  )
}

export default VehiclePanel
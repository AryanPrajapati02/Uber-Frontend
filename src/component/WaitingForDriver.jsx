import React from 'react'

function WaitingForDriver(props) {
 
  return (
    <div>
            <div
             onClick={() => {props.setVehicleFound(false) }}
              className='flex justify-between items-center'>

                <h2 className='text-xl font-bold  m-2'>Driver Found! </h2>
                {/* <img className='w-10 mr-2 p-2' src="https://cdn-icons-png.flaticon.com/512/1828/1828939.png" alt="" /> */}

                <button className='bg-red-200 border-2 border-red-300 font-semibold py-1 text-red-600 shadow-lg px-4 rounded-xl'>Cancel</button>

            </div>
            <div className='flex gap-4 justify-between items-center flex-col'>
                 <div className='flex w-full justify-center items-center'>
                <img className='h-[13vh]' src="https://i.pinimg.com/474x/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.jpg" alt="" />
                <div className='w-1/2 p-3 ml-3'>
                <h3 className=' text-lg font-semibold capitalize'>{props?.ride?.captain?.fullname?.firstname + ' ' + props.ride?.captain?.fullname?.lastname} </h3>
                <h3 className=' text-lg font-semibold'>{props?.ride?.captain?.vehicle?.plate}</h3>
                <h5 className=' text-lg text-rose-500 font-semibold'>OTP: {props?.ride?.otp}</h5>
                </div>
                 </div>
                    
                <div className='w-full flex flex-col gap-2 p-3'>
                    <div className='font-medium text-sm border-b-2 p-2'> Pickup: {props.ride?.pickup}</div>
                    <div className='font-medium text-sm   p-2 border-b-2'>Destination: {props.ride?.destination}</div>
                    <div className='font-medium text-sm p-2  border-b-2'> Distance: {props.ride?.distance}</div>


                </div>

            </div>
        </div>
  )
}

export default WaitingForDriver
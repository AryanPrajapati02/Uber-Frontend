import React from 'react'
import { Link } from 'react-router-dom'

function Start() {
    return (
        <div>

            <div className='h-screen pt-8   w-full bg-red-200 flex justify-between flex-col  bg-[url(https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_1380,w_1104/v1684852612/assets/ba/4947c1-b862-400e-9f00-668f4926a4a2/original/Ride-with-Uber.png)] bg-cover'>
                <img className='w-16 ml-[70px] mt-[-4px]' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                
                <div className='bg-white py-4 px-4 pb-16'> 
                    <h2 className='text-3xl font-bold text-center'>Get Started With Uber</h2>
                    <Link to='/login'><button className='w-full bg-black text-white py-3 rounded mt-4'>Continue</button></Link>
                </div>
            </div>

        </div>
    )
}

export default Start
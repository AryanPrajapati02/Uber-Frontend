import React , {useContext} from 'react'
import {CaptainDataContext} from '../context/CaptainContext'

function CaptainDetails() {
  const {captain} = useContext(CaptainDataContext)
  console.log(captain)
  return (
    <div>
   <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start gap-3 p-2 m-2' >


            <img className='h-10 w-10 rounded-full object-cover' src="https://res.cloudinary.com/dbmosnwqm/image/upload/v1734700342/meet_c4d5k7.jpg" alt="" />
            <h4 className='text-lg font-medium'>{captain.fullname.firstname +'' + captain.fullname.lastname}</h4>
          </div>
          <div className='p-2 mr-5'>
            <h4 className='font-bold text-lg'>₹296.30</h4>
            <p className='font-semibold text-gray-600'>Earned</p>
          </div>
        </div>

        <div className='flex  bg-gray-300 rounded-lg  justify-center gap-9 items-center  p-4'>
          <div className='text-center'>
            <i className="text-3xl mb-2 font-medium  ri-timer-2-line"></i>
            <h5 className='text-lg font-medium'>10.5</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
          <div className='text-center'>
            <i className="text-3xl mb-2 font-medium   ri-timer-flash-line"></i>
            <h5 className='text-lg font-medium'>10.5</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
          <div className='text-center'>
            <i className="text-3xl mb-2 font-medium   ri-booklet-line"></i>
            <h5 className='text-lg font-medium'>10.5</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
        </div>

    </div>
  )
}

export default CaptainDetails
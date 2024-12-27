import React , {useState , useRef} from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import FinishRide from '../component/FinishRide'
import { Link, useLocation } from 'react-router-dom'


function CaptainRiding() {

     const [finishRidePanel, setFinishRidePanel] = useState(false)
      const finishRidePanelRef = useRef(null)

      const location = useLocation()
      const rideData = location.state?.ride
  

      useGSAP(function(){
        if(finishRidePanel){
        gsap.to(finishRidePanelRef.current, {
            transform:'translateY(0)'
        })}else{
            gsap.to(finishRidePanelRef.current, {
                transform:'translateY(100%)'
            })
        }
    
     } ,[finishRidePanel])
    
  return (
    <div className='h-screen relative'>

    <div className='h-4/5'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

      <img className='object-cover h-full' src="https://baseweb.design/_next/static/media/rendezvous.e688c83c.png" alt="" />

    </div>
    

       <div className='h-1/5 p-6 flex items-center justify-between rounded-tr-2xl rounded-tl-2xl bg-yellow-300 relative'>   
    
    <h5 className='text-3xl font-bold absolute top-1 left-[50%] transform -translate-x-1/2'>
    <i className="ri-arrow-up-wide-line"></i>
    </h5>

     <h4 className='text-xl font-semibold'>4 KM away</h4>
     <button onClick={()=>setFinishRidePanel(true)} className='bg-green-500 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>


    </div>
    <div ref={finishRidePanelRef} className='fixed h-[100%] w-full z-10 bottom-0  translate-y-full bg-white px-3 py-5' >
        <FinishRide setFinishRidePanel={setFinishRidePanel}    ride={rideData}/>
 
    </div>
      



    

    
   

  </div>
  )
}

export default CaptainRiding
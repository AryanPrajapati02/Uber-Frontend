import React , {useState , useRef} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import CaptainDetails from './CaptainDetails'
import RidePopup from '../component/RidePopup'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import ConfirmRidePopup from '../component/ConfirmRidePopup'
import { useEffect ,useContext } from 'react'
import { io } from 'socket.io-client'
import {SocketContext} from '../context/SocketContext'
import {CaptainDataContext} from '../context/CaptainContext'
import LiveTracking from '../component/LiveTracking'


function CaptainHome() {
  const navigate = useNavigate()



  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const ridePopupPanelRef = useRef(null)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const confirmRidePopupPanelRef = useRef(null)


  const {captain} = useContext(CaptainDataContext)
  const {socket} = useContext(SocketContext)


  const [ride, setRide] = useState(null)

  useEffect(() => {
    socket.emit('join', {
        userId: captain._id,
        userType: 'captain'
    })
    const updateLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {

                socket.emit('update-location-captain', {
                    userId: captain._id,
                    location: {
                        ltd: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                })
            })
        }
    }

    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()

    // return () => clearInterval(locationInterval)
}, [])

socket.on('new-ride' ,(data)=>{
  console.log('new-ride')
  setRide(data)

      setRidePopupPanel(true)
      })


      async function confirmRide() {

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

            rideId: ride._id,
            captainId: captain._id,


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        setRidePopupPanel(false)
       setConfirmRidePopupPanel(true)
    }



    socket.on('ride-started', ride => {
        console.log("ride")
        setWaitingForDriver(false)
        navigate('/riding', { state: { ride } }) // Updated navigate to include ride data
    })


  const logoutCaptain = async (e) => {
    e.preventDefault()
    try {
      console.log("click")
      // const response = await toast.promise(

      //       axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`
      // ), {
      //     loading: 'Logging out...',
      //     success: 'Logged out successfully',
      //     error: 'An error occurred while logging out'
      // })

      // if(response.status === 200){


      localStorage.removeItem('token')
      navigate('/captain-login')
      // }

    } catch (e) {
      if (err.response && err.response.data.errors) {
        toast.error(err.response.data.errors[0].msg);
      } else {
        toast.error('Something went wrong. Please try again.');
      }


    }
  }

 useGSAP(function(){
    if(ridePopupPanel){
    gsap.to(ridePopupPanelRef.current, {
        transform:'translateY(0)'
    })}else{
        gsap.to(ridePopupPanelRef.current, {
            transform:'translateY(100%)'
        })
    }

 } ,[ridePopupPanel])
 useGSAP(function(){
    if(confirmRidePopupPanel){
    gsap.to(confirmRidePopupPanelRef.current, {
        transform:'translateY(0)'
    })}else{
        gsap.to(confirmRidePopupPanelRef.current, {
            transform:'translateY(100%)'
        })
    }

 } ,[confirmRidePopupPanel])


  return (
    <div className='h-screen'>
      <div className='h-3/5'>
        <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

        {/* <img className='object-cover h-full  ' src="https://baseweb.design/_next/static/media/rendezvous.e688c83c.png" alt="" /> */}

         {/* <img className='object-cover h-full  ' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        */}

<LiveTracking />

        <button onClick={(e) => logoutCaptain(e)} className='w-10 h-10 bg-gray-300 p-1    rounded-full absolute right-5 top-5'><i className="w-10 h-10 ri-logout-box-line"></i></button>



      </div>
      <div className='h-2/5 p-3 '>

     <CaptainDetails />
      </div>

      <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0  translate-y-full bg-white px-3 py-5' >
<RidePopup  setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel}  
ride={ride}

confirmRide={confirmRide}

/>
    </div>
      <div ref={confirmRidePopupPanelRef} className='fixed h-[100%] w-full z-10 bottom-0  translate-y-full bg-white px-3 py-5' >
<ConfirmRidePopup  setConfirmRidePopupPanel={setConfirmRidePopupPanel}  setRidePopupPanel={setRidePopupPanel}  
ride={ride}
/>  
    </div>

    </div>
  )
}

export default CaptainHome

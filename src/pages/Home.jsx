import React, { useEffect, useRef ,useContext} from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { toast } from 'react-hot-toast'
import LocationSearchPannel from '../component/LocationSerachPannel'
import VehiclePanel from '../component/VehiclePanel';
import ConfirmedRide from '../component/ConfirmedRide';
import LookingForDriver from '../component/LookingForDriver';
import WaitingForDriver from '../component/WaitingForDriver';
import {SocketContext} from '../context/SocketContext'
import {UserDataContext} from '../context/UserContext'
import ConfirmRidePopup from '../component/ConfirmRidePopup';
import LiveTracking from '../component/LiveTracking';


function Home() {
    const navigate = useNavigate()
    const [logout, setLogout] = useState(false)
    const [panelOpen, setPanelOpen] = useState(false)
    const token = localStorage.getItem('token')
    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)
    const vehiclePannelRef = useRef(null)
    const confirmRidePannelRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)
    const {socket} = useContext(SocketContext)
    const {user} = useContext(UserDataContext)

    useEffect(() => {
        socket.emit("join", { userType: "user", userId: user.user._id })
        console.log(user)
    }, [ user ])



    const [pickupSuggestions, setPickupSuggestions] = useState([])
    const [destinationSuggestions, setDestinationSuggestions] = useState([])
    const [activeField, setActiveField] = useState(null)
    const [ pickup, setPickup ] = useState('')
    const [ destination, setDestination ] = useState('')
    const [fare, setFare] = useState({})
    const [ vehicleType, setVehicleType ] = useState(null)
  
    const [ride, setRide] = useState('')

    const [vehiclePannel, setVehiclePannel] = useState(false)
    const [confirmRidePanel, setconfirmRidePanel] = useState(false)
    const [vehicleFound, setVehicleFound] = useState(false)
    const [waitingForDriver, setWaitingForDriver] = useState(false)


    const submitHandler = (e) => {
        e.preventDefault()


    }

    useGSAP(function () {
        if (panelOpen) {

            gsap.to(panelRef.current, {
                height: '100%'
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%'

            })
            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
        }

    }, [panelOpen])

    useGSAP(function () {
        if (vehiclePannel) {
            gsap.to(vehiclePannelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehiclePannelRef.current, {
                transform: 'translateY(100%)'
            })
        }

    }, [vehiclePannel])

    useGSAP(function () {
        if (confirmRidePanel) {
            gsap.to(confirmRidePannelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePannelRef.current, {
                transform: 'translateY(100%)'
            })
        }

    }, [confirmRidePanel])

    useGSAP(function () {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)'
            })
        }

    }, [vehicleFound])
    useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }

    }, [waitingForDriver])


    const logoutUser = async (e) => {
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
            navigate('/login')
            // }

        } catch (err) {
            if (err.response && err.response.data.errors) {
                toast.error(err.response.data.errors[0].msg);
            } else {
                toast.error('Something went wrong. Please try again.');
            }


        }
    }

    const handlePickupChange = async (e) => {
        setPickup(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            })
            setPickupSuggestions(response.data)
        } catch {
            // handle error
        }
    }

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setDestinationSuggestions(response.data)
        } catch {
            // handle error
        }
    }
    async function findTrip() {
        setVehiclePannel(true)
        setPanelOpen(false)

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params: { pickup, destination },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })


        setFare(response.data)
        


    }


    async function createRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
            pickup,
            destination,
            vehicleType
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
      console.log(response.data)

    }

    socket.on('ride-confirmed', ride => {

        console.log('ride-confirm',ride)
        setVehicleFound(false)
        setWaitingForDriver(true)                                     
        setRide(ride)
    })

    socket.on('ride-started', ride => {
        setWaitingForDriver(false)
        console.log(ride)
        navigate('/riding', { state: { ride } })
    })
   

    return (
        <div className='h-screen relative overflow-hidden'>
            <div >

                <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <button className='bg-red-200 border-2 border-red-300 font-semibold py-1 text-red-600 shadow-lg px-4 rounded-xl absolute right-5 top-3 z-20'
                    onClick={(e) => { logoutUser(e) }}
                >Logout</button>
            </div>
            <div className='h-screen w-screen'>

               <LiveTracking />
            </div>
            <div className=' flex  flex-col justify-end absolute h-screen w-full top-0  '>
                <div className='h-[33%] bg-white p-5  rounded-tr-2xl rounded-tl-2xl'>
                    <h4 className='text-3xl  font-semibold' onClick={() => { setPanelOpen(false) }} >Find a Trip</h4>
                    <form onSubmit={(e) => { submitHandler(e) }}>
                        <input type="text" placeholder='Add a Pickup Location' className='bg-[#eee] px-8 py-4 text-base rounded-xl w-full mt-4' 
                        value={pickup}
                        onChange={handlePickupChange}
                        onClick={() => {
                                setPanelOpen(true)
                                setActiveField('pickup')
                            }} />
                        <input type="text" placeholder='Enter Drop Location' className='bg-[#eee] px-8 py-4 text-base rounded-xl w-full mt-3 ' 
                        
                        onClick={() => { setPanelOpen(true) 
                        setActiveField('destination')
                         }}
                         value={destination}
                         onChange={handleDestinationChange}
                         />
                        {pickup && (<i className="ri-close-circle-line absolute right-10 top-[5.5rem] text-xl  cursor-pointer" onClick={()=>setPickup('')}></i>)}
                        {destination && (<i className="ri-close-circle-line absolute right-10 top-[9.7rem] text-xl  cursor-pointer"  onClick={()=>setDestination('')}></i>)}
                         

                          <button
                        onClick={findTrip}
                        className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
                        Find Trip
                    </button>

                    </form>
                </div>
                <div ref={panelRef} className=' 
                bg-white  pr-3     pl-3 '>
                    <LocationSearchPannel  setVehiclePannel={setVehiclePannel} setPanelOpen={setPanelOpen} 
                    suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                    
                    
                    setPickup={setPickup}
                    setDestination={setDestination}
                    activeField={activeField}
                    />

                </div>


            </div>
            <div ref={vehiclePannelRef} className='fixed w-full h-1/2 z-10 bottom-0  translate-y-full bg-white px-3 py-5' >
                <VehiclePanel setVehiclePannel={setVehiclePannel} setconfirmRidePanel={setconfirmRidePanel}
                 setVehicleType={setVehicleType}
                 fare={fare}
         />
            </div>
            <div ref={confirmRidePannelRef} className='fixed w-full z-10 bottom-0 mb-10  translate-y-full bg-white px-3 py-5' >
                <ConfirmedRide setconfirmRidePanel={setconfirmRidePanel} setVehicleFound={setVehicleFound} 
                createRide={createRide}
                pickup={pickup}
                destination={destination}
               fare={fare}
               vehicleType={vehicleType}
              

                />

            </div>
            <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0  translate-y-full bg-white px-3 py-5' >
                <LookingForDriver setVehicleFound={setVehicleFound} setWaitingForDriver={setWaitingForDriver} 
                   pickup={pickup}
                   destination={destination}
                  fare={fare}
                  vehicleType={vehicleType}
                />
            </div>
            <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0   bg-white px-3 py-5' >
                <WaitingForDriver setWaitingForDriver={setWaitingForDriver} 
                ride={ride}
                />
            </div>
            {/* <div ref={confirmRidePannelRef} className='fixed w-full z-10 bottom-0   bg-white px-3 py-5' >
                <ConfirmRidePopup setWaitingForDriver={setWaitingForDriver} 
                ride={ride}
                />
            </div> */}
        </div>
    )
}

export default Home
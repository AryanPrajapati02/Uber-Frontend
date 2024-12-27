import React from 'react'

function LocationSerachPannel({ suggestions, setVehiclePannel, setPanelOpen, setPickup, setDestination, activeField }) {
 

  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
        setPickup(suggestion)
    } else if (activeField === 'destination') {
        setDestination(suggestion)
    }
    // setVehiclePanel(true)
    // setPanelOpen(false)
}


// location = [
//   'Lahore, Punjab, Pakistan',
//   'Islamabad, Pakistan',
//   'Karachi, Pakistan',
//   'Quetta, Pakistan'
// ]

  return (
    <div className='p-1'>

     {/* {suggestions.map((elem)=>{
     return (<div onClick={()=>{ props.setVehiclePannel(true)
       props.setPanelOpen(false)}} className='gap-4 my-2 border-2 active:border-black p-3 rounded-xl flex justify-start items-center '>
      <h2 className='text-xl  w-10 h-10 rounded-full bg-zinc-100 mr-3 flex justify-center items-center'>📍</h2>
      <h4 className='font-semibold text-xl'>{elem}</h4>
    </div>)

      })}  */}
     { suggestions.map((elem, idx) => (
            <div key={idx} onClick={() => handleSuggestionClick(elem)} className='flex gap-4  border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                <h2 className='bg-[#eee] w-8 p-1 rounded-full'><i className="ri-map-pin-fill p-1"></i></h2>
                <h4 className='font-medium text-black'>{elem}</h4>
            </div>
        ))
   } 

    </div>
  )
}

export default LocationSerachPannel
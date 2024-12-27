import React, { createContext, useEffect, useState } from 'react'

export const UserDataContext = createContext()

const userContext = ({children}) =>{

const [user, setUser] = useState({
    email: '',
    password: '',
    fullname: {
        firstname: '',
        lastname: ''
    }
})

const storeToken = (token)=>{
    return localStorage.setItem('token', token)
}


  return (
    <div>
        <UserDataContext.Provider value={{user, setUser , storeToken }}>
            {children}
        </UserDataContext.Provider>
     </div>
  )
}

export default userContext
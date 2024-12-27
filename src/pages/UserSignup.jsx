import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function UserSignup() {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [firstname, setFirstname] = useState('')
const [lastname, setLastname] = useState('')
// const [userData, setUserData] = useState({})

const navigate = useNavigate()
const {user , setUser} = useContext(UserDataContext)


const submitHandler = async (e) => {
  e.preventDefault();

  const userData = {
    email: email,
    password: password,
    fullname: {
      firstname: firstname,
      lastname: lastname,
    },
  };

  try {
    const response = await toast.promise(
      axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, userData),
      {
        loading: 'Creating User...',
        success: 'User created successfully',
        error: 'An error occurred while creating the user',
      }
    );

    // If successful, handle the response
    if (response.status === 201) {
   
      navigate('/home');

      const data = response.data;
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setEmail('');
      setPassword('');
      setFirstname('');
      setLastname('');
    }
  } catch (err) {
    // Handle errors gracefully
    if (err.response && err.response.data.errors) {
      toast.error(err.response.data.errors[0].msg);
    } else {
      toast.error('Something went wrong. Please try again.');
    }
  }
};


  return (
    <div>

    <div className='p-7 flex flex-col h-screen justify-between'>
      <div>
        <img className='w-16 mb-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <form onSubmit={(e)=>{
          submitHandler(e)
        }} noValidate >


          <h3 className='text-lg font-medium mb-2'>What's Your Name</h3>

          <div className='flex gap-2'>

          <input required type="text"    
          value={firstname}
          onChange={(e)=>{setFirstname(e.target.value)}}
          placeholder='Firstname' className='bg-[#eeeeee] w-1/2 mb-5 rounded px-4 py-2 border  text-lg placeholder:text-base' />

          <input type="text"   
          value={lastname}
          onChange={(e)=>{setLastname(e.target.value)}}

          placeholder='Lastname' className='bg-[#eeeeee] w-1/2 mb-5 rounded px-4 py-2 border  text-lg placeholder:text-base' />
          </div>


          <h3 className='text-lg font-medium mb-2'>What's Your Email</h3>
          <input required type="email"  
          value={email}
          onChange={(e)=>{
            setEmail(e.target.value)
          }} placeholder='email@example.com' className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base' />


          <h3 className='text-lg font-medium mb-2' >Enter Password</h3>
          <input required type="password" 
          value={password}
          onChange={(e)=>{
            setPassword(e.target.value)} }
          placeholder='Password' className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' />

          <button className='bg-[#111] text-white font-semibold mb-4 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Create Account</button>
        </form>
        <p className='mb-4 text-center'>Already have an Account ? <Link to='/login' className='text-blue-500'>Login here</Link>
        </p>
      </div>
      <div>
      <Link to='/captain-signup '>  <button className='bg-[#d5622d] text-white    font-semibold mb-16 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Sign in as Captain</button>

      </Link>
      </div>
    </div>
  </div>
  )
}

export default UserSignup

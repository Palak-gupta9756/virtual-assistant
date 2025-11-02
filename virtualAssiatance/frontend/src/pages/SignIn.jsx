import React, { useState, useContext } from 'react'
import bg from "../assets/bg1.png"
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom'
import { userDataContext } from '../context/userContext';
import axios from "axios"

const SignIn = () => {
const [showPassword, setShowPassword] = useState(false)

const { serverUrl } = useContext(userDataContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const[loading,setLoding]=useState(false)
  const[err,setErr]=useState("")

  const handleSignIn = async (e) => {
    e.preventDefault()
    setErr("")
    setLoding(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signin`, 
        {  email, password }, 
        { withCredentials: true }
      )
      console.log(result)
      setLoding(false)
    } catch (error) {
      console.log(error)
      setLoding(false)
      setErr(error.response.data.message)
      
    }
  }
  return (
    <div className='w-full h-[100vh]  flex justify-center items-center' style={{
      backgroundImage: `url(${bg})`, backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat'
    }}>
      <form className='w-[90%] h-[700px] max-w-[600px] bg-[#00000062] px-[20px] backdrop-blur shadow-lg shadow-black-500 flex flex-col items-center justify-center gap-[20px]' onSubmit={handleSignIn}>
        <h1 className='text-white text-[30px] font-semibold mb-[30px]'>Sign In to <span className='text-blue-500'>Virtual Assistant</span></h1>
        <input type='email' placeholder='Email' className='w-full px-[20px] py-[10px] text-[18px] rounded-full h-[60px] outline-none border-2 border-white text-white  placeholder-gray-300' required onChange={(e) => setEmail(e.target.value)} value={email} />
        <div className='w-full relative h-[60px] border-2 bg-transparent border-white text-white   rounded-full'>
          <input type={showPassword ? "text" : "password"} placeholder='Password' className='w-full h-full rounded-full outline-none bg-transparent o  placeholder-gray-300 px-[20px] py-[10px]' required onChange={(e) => setPassword(e.target.value)} value={password} />
          {!showPassword && <IoMdEye className='absolute top-[15px] right-[20px] cursor-pointer text-[white] w-[25px] h-[25px]' onClick={() => setShowPassword(true)} />}
          {showPassword && <IoMdEyeOff className='absolute top-[15px] right-[20px] cursor-pointer text-[white] w-[25px] h-[25px]' onClick={() => setShowPassword(false)} />}
        </div>
        {err.length>0 && <p className='text-red-500 text-[17px]'>
          *{err}
          </p>}
        <button className='w-[150px] h-[60px] mt-[30px] bg-white rounded-full text-black font-bold text-[19px] ' disabled={loading}>{loading?"Loading...":"Sign In"}</button>
        <p className='text-white text-[18px] cursor-pointer' onClick={() => navigate('/signup')}>Want to create a new account ? <span className='text-blue-500'>Sign Up</span></p>
      </form>
    </div>
  )
}

export default SignIn
import React from 'react'
import { useContext } from 'react'
import { userDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'

function Home() {
  const navigate=useNavigate()
  const {userData,serverUrl,setUserData} = useContext(userDataContext)
  const handleLogOut=async()=>{
    try {
      const result=await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
      setUserData(null)
      navigate('/signin')
    } catch (error) {
      setUserData(null)
      console.log(error)
    }
  }

  useEffect(()=>{
    const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition

    const recognition=new SpeechRecognition()
    recognition.continuous=true,
    recognition.lang='en-US'
    recognition.onresult=(e)=>{
     const transcript=e.results[e.results.length-1][0].transcript.trim()
     console.log("heard:" +transcript)
     if(transcript.toLowerCase())
    }
    recognition.start()
  
  },[])
  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col gap-[15px]'>
       <button className='min-w-[150px] cursor-pointer absolute h-[60px] mt-[30px] top-[20px] right-[20px] bg-white rounded-full text-black font-bold text-[19px]' onClick={handleLogOut}>Log out</button>
        <button className='min-w-[150px] cursor-pointer h-[60px] absolute top-[100px] right-[20px] mt-[30px] bg-white rounded-full text-black font-bold text-[19px] px-[15px] py-[5px] ' onClick={()=>navigate('/customize')}>Customize your assistant</button>
      <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg'>
         <img src={userData?.assistantImage} className='h-full object-cover'/>
      </div>
      <h1 className='text-white text-[19px] font-semibold'>I'm {userData?.assistantName}</h1>
    </div>
  )
}

export default Home
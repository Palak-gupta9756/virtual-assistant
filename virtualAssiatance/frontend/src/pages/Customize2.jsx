import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import axios from 'axios'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function Customize2() {
  const navigate=useNavigate()
  const {userData,backendImage,selectedImage,serverUrl,setUserData}=useContext(userDataContext)
  const[assisstantName,setAssistantName]=useState(userData?.assisstantName || "")
  const[loading,setLoading]=useState(false)
const handleUpdateAssistant=async()=>{
  setLoading(true)
  try {
    let formData=new FormData()
    formData.append("assistantName",assisstantName)
    if(backendImage){
      formData.append("assistantImage",backendImage)
    }else{
      formData.append("imageUrl",selectedImage)
    }
    const result=await axios.post(`${serverUrl}/api/user/update`,formData,{withCredentials:true})
    setLoading(false)
    console.log(result.data)
    setUserData(result.data)
    navigate('/')
  } catch (error) {
    setLoading(false)
    console.log(error)
  }
}

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col relative'>
      <IoMdArrowRoundBack  className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer' onClick={()=>navigate("/customize")}/>
      <h1 className='text-white text-[35px] text-center mb-[40px]'>Enter your <span className='text-blue-300'>Assistant Name</span></h1>
      <input type='text' placeholder='Enter your Assistant Name' className='w-full  max-w-[600px] px-[20px] py-[10px] text-[18px] rounded-full h-[60px] outline-none border-2 border-white text-white  placeholder-gray-300' required onChange={(e)=>setAssistantName(e.target.value)} value={assisstantName} />
      {assisstantName && <button className='w-[300px] h-[60px] mt-[30px] bg-white rounded-full text-black font-bold text-[19px]  cursor-pointer' disabled={loading} onClick={()=>{
        handleUpdateAssistant()
        }
        }>{!loading? "Finally Create your Assistant" : "Loading..."}</button>}
      
    </div>
  )
}

export default Customize2

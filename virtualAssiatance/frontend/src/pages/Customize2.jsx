import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/userContext'
import axios from 'axios'

function Customize2() {
  const {userData,backendImage,selectedImage,serverUrl,setUserData}=useContext(userDataContext)
  const[assisstantName,setAssistantName]=useState(userData?.assisstantName || "")
const handleUpdateAssistant=async()=>{
  try {
    let formData=new FormData()
    formData.append("assistantName",assisstantName)
    if(backendImage){
      formData.append("assistantImage",backendImage)
    }else{
      formData.append("imageUrl",selectedImage)
    }
    const result=await axios.post(`${serverUrl}/api/user/update`,formData,{withCredentials:true})
    console.log(result.data)
    setUserData(result.data)
  } catch (error) {
    console.log(error)
  }
}

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col'>
      <h1 className='text-white text-[35px] text-center mb-[40px]'>Enter your <span className='text-blue-300'>Assistant Name</span></h1>
      <input type='text' placeholder='Enter your Assistant Name' className='w-full  max-w-[600px] px-[20px] py-[10px] text-[18px] rounded-full h-[60px] outline-none border-2 border-white text-white  placeholder-gray-300' required onChange={(e)=>setAssistantName(e.target.value)} value={assisstantName} />
      {assisstantName && <button className='w-[300px] h-[60px] mt-[30px] bg-white rounded-full text-black font-bold text-[19px]  cursor-pointer' onClick={()=>{
        handleUpdateAssistant()
        }
        }>Finally Create your Assistant</button>}
      
    </div>
  )
}

export default Customize2
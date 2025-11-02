import React, { useContext } from 'react'
import { userDataContext } from '../context/userContext'

function Card({image}) {
     const { serverUrl,userData,setUserData,backendImage,setBackendImage,frontendImage,setFrontendImage,selectedImage,setSelectedImage}=useContext(userDataContext)
  return (
    <div className={`w-[80px] h-[150px] lg:w-[200px] lg:h-[300px] bg-[#030326] border-2 border-[#0000ff5f] rounded-2xl  overflow-hidden hover:shadow-2xl hover:shadow-blue-900 cursor-pointer hover:border-4 hover:border-white ${selectedImage==image? "border-4 border-white shadow-2xl shadow-blue-900" :null}`} onClick={()=>setSelectedImage(image)}>
     <img src={image} className=' h-full object-cover'/>
    </div>
  )
}

export default Card
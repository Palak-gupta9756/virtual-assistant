import React, { useContext, useRef, useState } from 'react'
import { RiImageAddFill } from "react-icons/ri";
import Card from '../component/Card'
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.png"
import image3 from "../assets/image3.png"
import image4 from "../assets/image4.png"
import image5 from "../assets/image5.png"
import image6 from "../assets/image6.png"
import image7 from "../assets/image7.png"
import { userDataContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const Customize = () => {
    const { serverUrl,userData,setUserData,backendImage,setBackendImage,frontendImage,setFrontendImage,selectedImage,setSelectedImage}=useContext(userDataContext)
    const inputImage=useRef()
    const navigate=useNavigate()
    const handleImage=(e)=>{
     const file=e.target.files[0]
     setBackendImage(file)
     setFrontendImage(URL.createObjectURL(file))
    }
    
    return (
        <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col'>
            <h1 className='text-white text-[35px] text-center mb-[40px]'>Select your <span className='text-blue-300'>Assistant Image </span></h1>
            <div className='w-[90%] max-w-[60%] flex justify-center items-center flex-wrap gap-[30px]'>
                <Card image={image1} />
                <Card image={image2} />
                <Card image={image3} />
                <Card image={image4} />
                <Card image={image5} />
                <Card image={image6} />
                <Card image={image7} />
                <div className={`w-[80px] h-[150px] lg:w-[200px] lg:h-[300px] bg-[#030326] border-2 border-[#0000ff5f] rounded-2xl  overflow-hidden hover:shadow-2xl hover:shadow-blue-900 cursor-pointer hover:border-4 hover:border-white flex items-center justify-center  ${selectedImage=="input"? "border-4 border-white shadow-2xl shadow-blue-900" :null}` } onClick={()=>{inputImage.current.click(), setSelectedImage("input")}}>
                    {!frontendImage &&  <RiImageAddFill className='text-white w-[35px] h-[35px]' />}
                    {frontendImage && <img src={frontendImage} className='h-full  object-cover'/>}
                   
                </div>
                <input type='file' accept='image/*' ref={inputImage} hidden onChange={handleImage}/>
            </div>
            {selectedImage && <button className='w-[150px] h-[60px] mt-[30px] bg-white rounded-full text-black font-bold text-[19px]  cursor-pointer' onClick={()=>navigate('/customize2')}>Next</button>}
  
        </div>
    )
}

export default Customize
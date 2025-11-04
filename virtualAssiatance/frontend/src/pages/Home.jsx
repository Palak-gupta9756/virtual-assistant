import React, { useRef } from 'react'
import { useContext } from 'react'
import { userDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import ai from "../assets/ai.gif"
import userImage from "../assets/user1.gif"

function Home() {
  const navigate=useNavigate()
  const {userData,serverUrl,setUserData,getGeminiResponse} = useContext(userDataContext)
  const [listening,setListening]=useState(false)
  const [userText,setUserText]=useState("")
  const [aiText,setAiText]=useState("")
  const isSpeakingRef=useRef(false)
  const recognitionRef=useRef(null)
  const synth=window.speechSynthesis
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

  const startRecognition=()=>{
    try {
      recognitionRef.current?.start();
      setListening(true)
    } catch (error) {
      if(!error.message.includes("start")){
        console.error("Recpgnition Error",error);
      }
      
    }
  };

  const speak=(text)=>{
    console.log("Speaking:", text)
     const utterence=new SpeechSynthesisUtterance(text)
     isSpeakingRef.current=true
     utterence.onend=()=>{
      isSpeakingRef.current=false
      startRecognition()
    }
     synth.speak(utterence)
  }

const handleCommand = (data) => {
  const { type, userInput, response } = data;
  speak(response);
  const query = encodeURIComponent(userInput || response || "");

  if (type === "google-search") {
    window.open(`https://www.google.com/search?q=${query}`, "_blank");
  }
  if (type === "calculator-open") {
    window.open(`https://www.google.com/search?q=calculator`, "_blank");
  }
  if (type === "instagram-open") {
    window.open(`https://www.instagram.com/`, "_blank");
  }
  if (type === "facebook-open") {
    window.open(`https://www.facebook.com/`, "_blank");
  }
  if (type === "weather-show") {
    window.open(`https://www.google.com/search?q=weather`, "_blank");
  }
  if (type === "youtube-open") {
    window.open(`https://www.youtube.com/`, "_blank");
  }
  if (type === "youtube-search" || type === "youtube-play") {
    const query = encodeURIComponent(userInput || response || "song");
    window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");
  }
};

  useEffect(()=>{
    const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition

    const recognition=new SpeechRecognition()
    recognition.continuous=true,
    recognition.lang='en-US'

    recognitionRef.current=recognition
    const isRecognitingRef={current:false}

    const safeRecognition=()=>{
      if(!isSpeakingRef.current && !isRecognitingRef.current){
       try {
         recognition.start()
         console.log("Recognition request to start");
       } catch (err) {
        if(err.name !=="InvalidStateError"){
          console.log("start error:",err);
        }
       }
      }
    }

    recognition.onStart=()=>{
      isRecognitingRef.current=true;
      setListening(true);
    };

    recognition.onend=()=>{
      isRecognitingRef.current=false;
      setListening(false);

      if(!isSpeakingRef.current){
        setTimeout(()=>{
          safeRecognition();
        },1000);
      }
    };

    recognition.onerror=(event)=>{
      console.warn("Recognition error",event.error)
      isRecognitingRef.current=false;
      setListening(false)
      if(event.error !=="aborted" && !isSpeakingRef.current){
        setTimeout(()=>{
          safeRecognition();
        },1000);
      }
    };

    recognition.onresult=async(e)=>{
     const transcript=e.results[e.results.length-1][0].transcript.trim()
     console.log("heard:" +transcript)
     if(transcript.toLowerCase().includes(userData.assistantName.toLowerCase())){
      setAiText("")
      setUserText(transcript)
      recognition.stop()
      isRecognitingRef.current=false
      setListening(false)
       const data=await getGeminiResponse(transcript)
       console.log(data)
       handleCommand(data)
       setAiText(data.response)
       setUserText("")
     }
    }
    const fallback=setInterval(()=>{
       if(!isSpeakingRef.current && !isRecognitingRef.current){
        safeRecognition();
       }
    },10000)

    safeRecognition()

    return ()=>{
      recognition.stop()
      setListening(false)
      isRecognitingRef.current=false
      clearInterval(fallback)
    }
  
  },[])

  useEffect(() => {
    const resumeSpeech = () => {
      window.speechSynthesis.resume()
    }
    window.addEventListener('click', resumeSpeech)
    return () => window.removeEventListener('click', resumeSpeech)
  }, [])

  
  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col gap-[15px]'>
       <button className='min-w-[150px] cursor-pointer absolute h-[60px] mt-[30px] top-[20px] right-[20px] bg-white rounded-full text-black font-bold text-[19px]' onClick={handleLogOut}>Log out</button>
        <button className='min-w-[150px] cursor-pointer h-[60px] absolute top-[100px] right-[20px] mt-[30px] bg-white rounded-full text-black font-bold text-[19px] px-[15px] py-[5px] ' onClick={()=>navigate('/customize')}>Customize your assistant</button>
      <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg'>
         <img src={userData?.assistantImage} className='h-full object-cover'/>
      </div>
      <h1 className='text-white text-[19px] font-semibold'>I'm {userData?.assistantName}</h1>
      {!aiText && <img src={userImage} className='w-[200px]'/>}
      {aiText && <img src={ai} className='w-[200px]'/>}
    </div>
  )
}

export default Home


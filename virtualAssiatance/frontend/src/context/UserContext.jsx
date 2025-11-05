import React, { createContext, useEffect, useState } from 'react'
import axios from "axios"
export const userDataContext = createContext()
const UserContext = ({ children }) => {
  const serverUrl = "https://virtualassistantbackend-3dvs.onrender.com"
  const [userData, setUserData] = useState(null)
  const [frontendImage, setFrontendImage] = useState(null)
  const [backendImage, setBackendImage] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true })
      setUserData(result.data)
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getGeminiResponse = async (command) => {
    try {
      const result = await axios.post(`${serverUrl}/api/user/asktoassistant`, { command }, { withCredentials: true })
      return result.data
    } catch (error) {
      console.error(" Backend error:", error.response?.data || error.message);
      return null; 
    }
  }

  useEffect(() => {
    handleCurrentUser()
  }, [])
  const value = {
    serverUrl, userData, setUserData, backendImage, setBackendImage, frontendImage, setFrontendImage, selectedImage, setSelectedImage, getGeminiResponse
  }
  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  )
}

export default UserContext

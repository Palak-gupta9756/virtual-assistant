import React, { useContext } from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/signin'
import Customize from './pages/Customize'
import { userDataContext } from './context/userContext'
import Home from './pages/Home'

const App = () => {
  const {userData,setUserData}=useContext(userDataContext)
  return (
    <Routes>
      <Route path='/' element={(userData?.assisstantImage && userData?.assisstantName)?<Home/> : <Navigate to={"/customize"}/>}/>
      <Route path='/signup' element={!userData?<SignUp/> : <Navigate to={"/"}/>}/>
      <Route path='/signin' element={!userData?<SignIn/>: <Navigate to={"/"}/>}/>
      <Route path='/customize' element={userData?<Customize/>:<Navigate to={"/signin"}/>}/>
    </Routes>
  )
}

export default App
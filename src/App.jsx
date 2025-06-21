import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css' 
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ClinicsPage from './pages/ClinicsPage'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <NavBar/>
   <Routes>
    <Route path="/" element={<HomePage/>}></Route>
    <Route path="/clinics" element={<ClinicsPage/>}></Route>
    <Route path="/signin" element={<SignUp/>}></Route>
   </Routes>
   <Footer/>
    </>
  )
}

export default App

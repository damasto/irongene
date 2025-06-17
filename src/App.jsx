import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css' 
import Header from "./components/NavBar"
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Header/>
   <Routes>
    <Route path="/signin" element={<SignUp/>}></Route>
   </Routes>
    </>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css' 
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ClinicsPage from './pages/ClinicsPage'
import BookingPage from './pages/BookingPage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import IsAnon from './components/isAnon'
import IsPrivate from './components/isPrivate'
import ProfilePage from './pages/ProfilePage'
import NoPermissionsPage from './pages/NoPermissionsPage'
import SystemAdminPage from './pages/SystemAdminPage'
import IsAdmin from './components/isAdmin'
import NotFoundPage from './pages/NotFoundPage'
import EditUsersPage from './components/EditUsersTable'




function App() {

  return (
    <>
   <NavBar/>
   <Routes>
    <Route path="/" element={<HomePage/>}></Route>
    <Route path="/clinics" element={<ClinicsPage/>}></Route>
    <Route path="/clinics/:clinicSlug" element={<ClinicsPage/>}></Route>
    <Route path="/booking/:_id" element={<IsPrivate><BookingPage/></IsPrivate>}></Route>
    <Route path="/profile" element={<IsPrivate><ProfilePage/></IsPrivate>}></Route>
    <Route path="/signup" element={<IsAnon><SignUp/></IsAnon>}></Route>
    <Route path="/signin" element={<IsAnon><SignIn/></IsAnon>}></Route>
    <Route path="/forbidden" element={<NoPermissionsPage/>}></Route>
    <Route path="*" element={<NotFoundPage/>}></Route>
    <Route path="/system-administration" element={<IsAdmin><SystemAdminPage/></IsAdmin>}></Route>
   </Routes>
   <Footer/>
    </>
  )
}

export default App

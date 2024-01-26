import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import LandingPage from './screens/LandingPage'
import Index from './Components/Index.jsx'
import Login from './Components/Login'
import Signup  from './Components/Signup'
import { Outlet,Router,Route, Routes} from 'react-router-dom'
import Show from './Components/Show'
import {UserContextProvider} from './UserContext'
import AddNote from './Components/Notes/AddNote.jsx'
import Edit from './Components/Edit.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [loading,setLoading] = useState(false)
  
  // const dispatch = useDispatch() 
  // useEffect(()=>{

  // },[])
  return ( 
    <>
    <UserContextProvider>
    <Header/>

    <main>
     <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/notes" element={<Index/>}/>
      <Route path="/notes/:id" element={<Show/>}/>
      <Route path="/notes/:id/edit" element={<Edit/>}/>
     
      <Route path="/notes/addNote" element={<AddNote/>}/>
      
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      
      </Routes>
    </main>
    </UserContextProvider>
 
    </>
  )
}

export default App

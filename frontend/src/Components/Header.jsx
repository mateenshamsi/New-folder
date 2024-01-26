import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import { UserContext } from '../UserContext'
import axios  from 'axios'
function Header() {
 const {userInfo,setUserInfo} = useContext(UserContext)
  const logoutHandler  = async()=>{
    await axios.post('/api/logout')
  
    setUserInfo("")
  }
  return (
   
       

<nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <h1 className='text-white'><a href="/">Notes App</a></h1>
  
    <div className='flex flex-wrap  items-center justify-between gap-4'> 
      {!userInfo?<><button className='text-white'><Link to="/login">Login</Link></button>
      <button className='text-white'><Link href="/login">Signup</Link></button>
      </>:(<button className='text-white' onClick={logoutHandler}>Logout</button>)
      }

    </div>
    </div>
</nav>
 
   
  )
}

export default Header

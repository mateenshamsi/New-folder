import React from 'react'
import './LandingPage.css'  
function LandingPage() {
  return (
   <div className='main flex justify-center h-screen items-center'>
    <div className=' w-full text-center'>
    <div > 
        <h1 className="title text-4xl">Welcome to Notes App</h1>
    </div>
    <div className='flex  justify-center mt-8 items-center'>
      <button className='mr-4 px-6 py-2 rounded-lg bg-blue-300'><a href="/login">Login</a></button>
      <button className='mr-4 px-6 py-2 rounded-lg bg-green-300'><a href="/signup">Signup</a></button>
    </div>
        </div> 
    
   </div>
  )
}

export default LandingPage

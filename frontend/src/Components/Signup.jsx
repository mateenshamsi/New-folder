import axios from 'axios'
import React,{useState,useEffect,useContext} from 'react'
import { UserContext } from '../UserContext'
import { Navigate } from 'react-router-dom'

function Signup() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [username,setUsername] = useState("")
  const [message,setMessage] = useState(null)
  const [loading,setLoading] = useState(false)
  const [redirect,setRedirect]  = useState(false)

  const {setUserInfo}  = useContext(UserContext)
  const registerHandler = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
  
      const { data } = await axios.post('/api/user/register', { username, email, password });
  
      setUserInfo(data);
      
  
      if (data) {
        setRedirect(true);
      } else {
        setRedirect(false);
        // You might want to set an error message if registration fails.
        setMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // Set an error message or handle the error as needed.
      setMessage("An error occurred during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  if(redirect)
  { 
    return <Navigate to="/notes"/> 
  }  
  return (
    <div className="bg-gray-100 h-screen flex flex-col justify-center items-center">
  
    <h2 className="text-4xl font-bold mb-6">Register</h2>

    <form className='w-1/2 ' onSubmit={registerHandler}>
    <div className="mb-4">
            <label htmlFor="username" className="block  text-2xl text-gray-600">Username</label>
            <input type="text" id="username" name="username" value={username} className="mt-1 p-2 w-full text-white border rounded-md" onChange={e=>setUsername(e.target.value)} />
        </div>

        <div className="mb-4">
            <label htmlFor="email" className="block  text-2xl text-gray-600">Email</label>
            <input type="email" id="email" name="email" value={email} className="mt-1 p-2 w-full border rounded-md" onChange={(e)=>setEmail(e.target.value)}/>
        </div>

        <div className="mb-4">
            <label htmlFor="password" className="block text-2xl text-gray-600">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="mt-1 p-2 w-full border rounded-md" />
        </div>
        <div className='flex justify-between '> 
        <button type="submit" className='bg-blue-300 text-blue-600 text-2xl border self-center border-blue-500 rounded-md px-4 py-2'>Register</button>
        </div>
    </form>
</div>
  )
}

export default Signup

import React, { useState, useContext,useEffect} from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { Navigate } from 'react-router-dom';
function Login() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  
  const [message,setMessage] = useState(null)
  const [loading,setLoading] = useState(false)
  const [redirect,setRedirect]  = useState(false)
  const {userInfo,setUserInfo}  = useContext(UserContext)
  
  useEffect(() => {
    // This block will run whenever userInfo changes
    console.log("Updated User Info:", userInfo);
  }, [userInfo]);
  const loginHandler = async (e) => {
    e.preventDefault();
    console.log(email);
  try{
    const response = await axios.post('/api/user/login', { email, password });
    console.log("Server response:", response);

    const data = response.data;
    console.log("User data:", data);

    setUserInfo(data);
    

    if (response.status === 200 && data) {
      setRedirect(true);
    } else {
      setRedirect(false);
      setMessage("Login failed. Please check your credentials and try again.");
    } }
    
    catch (error) {
      console.error("Error during login:", error);
      setRedirect(false);
      setMessage("An error occurred during login. Please try again.");
    }
  };
  
  if(redirect)
  { 
    return <Navigate to="/notes"/>
  }
  return (
    <div className="bg-gray-100 h-screen flex flex-col justify-center items-center">
      <h2 className="text-4xl font-bold mb-6">Login</h2>

      <form className="w-1/2" onSubmit={loginHandler} method="POST">
        <div className="mb-4">
          <label htmlFor="email" className="block text-2xl text-gray-600">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-2xl text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="flex justify-center">
          <button type="submit" className="bg-blue-300 text-blue-600 text-2xl border border-blue-500 rounded-md px-4 py-2">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

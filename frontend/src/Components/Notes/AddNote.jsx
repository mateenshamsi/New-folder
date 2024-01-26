import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import { UserContext } from '../../UserContext'
import { Navigate } from 'react-router-dom'
function AddNote() {
    const [title,setTitle] = useState("")
    const [content,setContent] = useState("")
    const [category,setCategory] = useState("")
    const [redirect,setRedirect] = useState("")
    const {userInfo,setUserInfo} = useContext(UserContext)
   if(!userInfo)
   { 
    alert("Please login to create a note")
    return <Navigate to="/login"/>
   }
    const addNote = async(e)=>{
      e.preventDefault()
      const response = await axios.post("/api/notes",{title:title,content:content,category:category})
      const newNote = response.data 
      console.log(newNote)
      if(newNote)
      {
        setRedirect(true)
      }
    } 
    if(redirect)
    { 
      return <Navigate to="/notes"/>
    }
  return (
   
    <div className="my-12 flex flex-col items-center">
    <h1 className="text-2xl font-bold mb-4">Add Note</h1>
<div className='w-full my-12 flex flex-row justify-center items-center'>
  <form  onSubmit={addNote} className='flex   flex-col '>
    <input
      type="text"
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className='mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
    />
    <textarea
      placeholder="Content"
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className='mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
    />
    <input
      type="text"
      placeholder="Category"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className='mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
    />
    <button
      type="submit"
      className='border border-blue-500 bg-blue-300 py-2 px-4 rounded-md'>
      Submit
    </button>
  
  </form>
</div>
</div>
  )
}

export default AddNote

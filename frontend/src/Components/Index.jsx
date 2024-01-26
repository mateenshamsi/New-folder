import React, { useEffect,useState,useContext } from 'react'
import { Link, useParams } from 'react-router-dom'

import { UserContext } from '../UserContext'
import axios from 'axios' 
function Index() {
  const [notes,setNotes] = useState([])
  useEffect(()=>{fetchNotes()}
   )
    
  const {userInfo,setUserInfo} = useContext(UserContext)
  const fetchNotes = async()=>{
    const {data} = await axios.get("/api/notes")
    setNotes(data)
  }
  const {id} = useParams() 
  const deleteHandler = async(noteId)=>{ 
   
    const res = await axios.delete(`/api/notes/${noteId}`)
    if(res)
    { 
      alert("Note is deleted")
    }
  }
  return (
    <div className='w-full my-12'>
      <h1 className='text-4xl mx-4 mt-6 text-center'>My Notes</h1>
      <button className='ml-6 px-6 m-2 mt-10 border-blue-300 bg-blue-500 w-[85px] text-lg border py-2 text-white rounded-lg'>
        <Link to="/notes/addNote">Add Notes</Link>
      </button>

      {notes.map((note) => (
        <div key={note._id} className='my-12 mx-4 border-2 border-sky-200 flex items-center justify-between'>
          <h1 className='mx-4 mt-4 text-2xl'>{note.title}</h1>
          <div className='flex mx-4 flex-wrap gap-4'>
            <button className='bg-blue-400 py-2 rounded-lg px-4 my-4'><a href={`/notes/${note._id}`}>Details</a></button>
            <button
  className='bg-red-400 py-2 px-4 rounded-lg my-4'
  onClick={() => deleteHandler(note._id)}
>
  Delete
</button>

          </div>
        </div>
      ))}
    </div> 
  )
}

export default Index

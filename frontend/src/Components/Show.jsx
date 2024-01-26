import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Notes} from '../Notes'
import axios from 'axios'
function Show() {
   const [note, setNote] = useState({});
  const {id} = useParams()
  useEffect(()=>{
    fetchNote()
  })
  const fetchNote = async()=>{ 
    const response = await axios.get(`/api/notes/${id}`)
    const fetchedNote = response.data 
    setNote(fetchedNote)
  }
  
  return (
    <div className='w-full my-12'>
      <h1 className='text-4xl mt-6 mx-4 text-center text-black'>Note Details</h1>
      <div className='my-12 mx-4 border-2 border-blue-400 flex items-center justify-between w-full'>
        <div>
          <div className="mx-4 mt-4">
            <h1 className='mx-4 mt-4 text-4xl'>{note.title}</h1>
             <p className='mx-4 mt-6'>Details: {note.content}</p>
            <p className='mx-4 mt-6'>Category: {note.category}</p>
            <p>Author : {note.author.username}</p>
            <button className='bg-blue-300 rounded px-4 mt-4 mb-4'><a href={`/notes/${note._id}/edit`}>Update</a></button>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Show

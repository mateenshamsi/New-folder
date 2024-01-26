import React, { useEffect, useState } from 'react'
import {Navigate, useParams} from 'react-router-dom'
import axios from 'axios'
function Edit() {
  const {id} = useParams() 
  const [content,setContent] = useState("") 
  const [category,setCategory] = useState("") 
  const [note,setNote] = useState({})
  const [updatedTitle,setUpdatedTitle] = useState('')
  const [redirect,setRedirect] = useState(false)
  useEffect(()=>{ 
    const fetchNote= async()=>{
        try{ 
            const {data} = await axios.get(`/api/notes/${id}`)
            setNote(data)
            setUpdatedTitle(data.title)
            setContent(data.content)
            setCategory(data.category) 
        }
        catch(e)
        { 
            console.error('Error fetching notes',e)
        }
    }
    fetchNote()
},[id])
    const handleUpdate = async(e)=>{
       e.preventDefault()
        try{ 
            await  axios.put(`/api/notes/${id}`,{title:updatedTitle,content:content,category:category})
            alert('Note is updated')
        }
        catch(e)
        { 
            console.error('Error updating',e) 
        }
        setRedirect(true)
    }
    if(redirect)
    { 
        return <Navigate to={"/notes/"+id}/>
    }
    return (
    <div className='w-full my-12'>
        <div className="text-4xl">Update Note</div> 
        <div className='w-full my-12 flex flex-row justify-center items-center'>
  <form  onSubmit={handleUpdate} className='flex   flex-col '>
    <input
      type="text"
      placeholder="Title"
      value={updatedTitle}
      required
      onChange={(e) => setTitle(e.target.value)}
      className='mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
    />
    <textarea
      placeholder="Content"
      value={content}
      required
      onChange={(e) => setContent(e.target.value)}
      className='mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
    />
    <input
      type="text"
      placeholder="Category"
      value={category}
      required
      onChange={(e) => setCategory(e.target.value)}
      className='mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
    />
    <button
      type="submit"
      className=' bg-blue-300 py-2 px-4 rounded-md'>
      Submit
    </button>
  
  </form>
</div>

    </div>
  )
}

export default Edit 

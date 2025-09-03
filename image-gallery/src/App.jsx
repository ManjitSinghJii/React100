import React, { useEffect, useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import 'animate.css';
import axios from "axios"
import { toast, ToastContainer} from "react-toastify"

const API_KEY = "2R9olJqIZa8q6wCk5jONcElPhtAbJ75PGqS9ZEZANAFj3ZKZH1ZD3Zgx"

const App = () => {

  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchImage = async ()=> {
    try{
      setLoading(true)
      const options = {
        headers: {
          Authorization: API_KEY
        }
      }
      const res =  await axios.get(`https://api.pexels.com/v1/search?query=people&page=1&per_page=12`, options)
      setPhotos(res.data.photos)      
    }
    catch(err){
      toast.error("Failed to fetch images")
    }
    finally{
      setLoading(false)
    }
  }
  useEffect(()=> {
    fetchImage()
  },[])
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center gap-12 py-8 animate__animated animate__fadeIn'>
      <h1 className='text-4xl font-bold text-indigo-600'>📷 Image Gallery</h1>

      <form>
        <input type="text" 
          className='border border-gray-300 p-3 bg-white rounded-l-lg w-[400px] focus:outline-indigo-500 '
          placeholder='serch your image here'
          required
        />
        <button className='bg-gradient-to-br from-indigo-600 via-blue-400 to-indigo-500 text-white font-bold py-3 px-8 rounded-r-lg hover:scale-105 transition-transform'>Search</button>
      </form>
      <div className='grid lg:grid-cols-4 lg:gap-12 gap-8 w-9/12 '>
        {
          photos.map((item, index)=> (
            <div key={index} className='bg-white rounded-xl '>
              <img src="ss" alt="images" />
            </div>
          ))
        }
      </div>
      {
        loading && 
        <i className="ri-loader-2-fill text-4xl font-bold text-gray-400 animate-spin "></i>
      }
      <ToastContainer />
    </div>
  )
}

export default App
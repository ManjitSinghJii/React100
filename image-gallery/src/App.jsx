import React, { useEffect, useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import 'animate.css';
import axios from "axios"
import { toast, ToastContainer} from "react-toastify"

const API_KEY = "2R9olJqIZa8q6wCk5jONcElPhtAbJ75PGqS9ZEZANAFj3ZKZH1ZD3Zgx"

const App = () => {

  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState("hair")


  const fetchImage = async ()=> {
    try{
      setLoading(true)
      const options = {
        headers: {
          Authorization: API_KEY
        }
      }
      const res =  await axios.get(`https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=12`, options)
      setPhotos([
        ...photos,
        ...res.data.photos
      ])      
    }
    catch(err){
      toast.error("Failed to fetch images")
    }
    finally{
      setLoading(false)
    }
  }

  
  const loadMore = ()=> {
    setPage(page + 1)
  }

  const search = (e)=> {
    e.preventDefault()
    const q = e.target[0].value.trim()
    setPhotos([])
    setQuery(q)
  }

  useEffect(()=> {
    fetchImage()
  },[page, query])

  
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center gap-12 py-8 animate__animated animate__fadeIn'>
      <h1 className='text-4xl font-bold text-indigo-600'>📷 Image Gallery</h1>

      <form onSubmit={search}>
        <input type="text" 
          className='border border-gray-300 p-3 bg-white rounded-l-lg w-[400px] focus:outline-indigo-500 '
          placeholder='serch your image here'
          required
        />
        <button className='bg-gradient-to-br from-indigo-600 via-blue-400 to-indigo-500 text-white font-bold py-3 px-8 rounded-r-lg hover:scale-105 transition-transform'>Search</button>
      </form>
      {
        (photos.length === 0) &&
        <h1 className='text-red-500 text-4xl font-medium'>{query} result Not found! </h1>
      }
      <div className='grid lg:grid-cols-4 lg:gap-12 gap-8 w-9/12 '>
        {
          photos.map((item, index)=> (
            <div key={index} className='bg-white rounded-xl '>
              <img 
                src={item.src.medium} 
                alt={item.alt} 
                className='rounded-t-lg h-[180px] object-cover w-full hover:scale-110 transition-transform duration-300 '
              />

              <div className='p-3'>
                <h1 className='text-lg text-gray-700 font-medium capitalize'>{item.photographer} </h1>
                <a target='_blank' href={item.src.original} className='mt-3 block bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white font-bold text-center p-2 rounded-lg hover:scale-105 transition-transform duration-300'>
                  <i className='ri-download-line mr-1'></i>
                  Download
                </a>
              </div>
            </div>
          ))
        }
      </div>
      {
        loading && 
        <i className="ri-loader-2-fill text-4xl font-bold text-gray-400 animate-spin "></i>
      }

      {
        photos.length > 0 &&
        <button onClick={loadMore} className='bg-rose-500 text-white py-3 px-16 rounded-lg font-medium hover:scale-105 transition-transform duration-200'>Load More!</button>
      }
      <ToastContainer />
    </div>
  )
}

export default App
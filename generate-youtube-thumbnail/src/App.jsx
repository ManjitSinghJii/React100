import React, { useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import 'animate.css';
import getYouTubeId from "get-youtube-id"
import { ToastContainer, toast} from "react-toastify"

const App = () => {

  const urlModel = [
    {
      width: 120,
      height: 90,
      url: "https://img.youtube.com/vi/",
      filename: "default.jpg"
    },

    {
      width: 320,
      height: 180,
      url: "https://img.youtube.com/vi/",
      filename: "mqdefault.jpg"
    },

    {
      width: 480,
      height: 360,
      url: "https://img.youtube.com/vi/",
      filename: "hqdefault.jpg"
    },

    {
      width: 640,
      height: 480,
      url: "https://img.youtube.com/vi/",
      filename: "sddefault.jpg"
    },

    {
      width: 1280,
      height: 720,
      url: "https://img.youtube.com/vi/",
      filename: "maxresdefault.jpg"
    }
  ]

  const [url, setUrl] = useState("")
  const [thumbnail, setThumbnail] = useState([])

  const fetchThumbnail = (e)=> {
    e.preventDefault()
    const videoId = getYouTubeId(url)

    if(!videoId)
      return toast.error("Invalid Url", {position: "top-center"})

    const model = urlModel.map((item)=> {
      return {
        ...item,
        url: `${item.url}${videoId}/${item.filename}`
      }
    })
    setThumbnail(model)
  }

  return (
    <div className='min-h-screen bg-gray-200 py-8'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-pink-500'>Youtube thumbnail Downloader</h1>
        <form className='space-x-4 mt-8' onSubmit={fetchThumbnail} >
          <input
            className='bg-white p-3 rounded-lg w-[450px] '
            placeholder='Enter youtub videos url...'
            required
            onChange={(e)=>setUrl(e.target.value)}
            type='url'
          />
          <button className='p-3 rounded-lg hover:scale-92 transition-transform duration-300 text-white font-medium bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500'>
            <i className="ri-search-line mr-1"></i>
            Search
          </button>
        </form>
      </div>

      <div className='grid grid-cols-3 gap-12 w-9/12 mx-auto mt-12'>
        {
          thumbnail.map((item, index)=>(
            <div className='bg-white rounded-lg hover:scale-105 transition-transform duration-300' key={index}>
              <img 
                src={item.url} 
                alt="" 
                className='w-full h-[250px] object-cover rounded-t-xl '
              />

              <div className='p-3 bg-amber-50 rounded-b-xl flex justify-between items-center'>
                <h1 className='text-xl text-blue-600 font-medium'>{item.width} x {item.height} </h1>
                <a target='_blank' href={item.url} >
                  <button className='py-2 px-4 rounded-lg hover:scale-92 transition-transform duration-300 text-white font-medium bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500'>
                    <i className="ri-download-fill mr-1"></i>
                    Download
                  </button>
                </a>
              </div>
            </div>
          ))
        }
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
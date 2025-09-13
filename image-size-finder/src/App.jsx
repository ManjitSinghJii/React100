import React, { useState } from 'react'
import { ArrowRight, PlusCircle } from "lucide-react"

const App = () => {

  const [src, setSrc] = useState("/vite.svg")
  const [original, setOriginal] = useState({
    width: 0,
    height: 0
  })
  const [suggestedHeight, setSuggestedHeight] = useState(0)
  const [suggestedWidth, setSuggestedWidth] = useState(0)

  const chooseImage = ()=> {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.click()
    input.onchange = ()=> {
      const file = input.files[0]
      const url = URL.createObjectURL(file)
      const image = new Image()
      image.src = url
      setSrc(url)
      image.onload = ()=> {
        setOriginal({
          width: image.width,
          height: image.height
        })
      }
    }
  }

  const findWidth = (e)=> {
    e.preventDefault()
    const height = e.target[0].value
    const width = (height * original.width) / original.height
    setSuggestedWidth(Math.round(width))
  }

  const findHeight = (e)=> {
    e.preventDefault()
    const width = e.target[0].value
    const height = (width * original.height) / original.width
    setSuggestedHeight(Math.round(height))
  }

  return (
    <div className='bg-slate-800 min-h-screen'>
      <div className='w-9/12 mx-auto py-16 text-white'>
        <button onClick={chooseImage} className='bg-amber-900 font-medium flex justify-center items-center px-12 py-3 rounded-lg gap-1 hover:scale-95 transition-transform duration-300'>
          <PlusCircle  className='w-5 h-5'/>
          Add Image
        </button>

        <div className=' bg-gray-100 rounded-xl p-8 mt-6 flex justify-center'>
          <img src={src} alt="image" className='w-[35%] ' />
        </div>

        <div className=' bg-gray-700 rounded-xl p-8 mt-6 grid grid-cols-2 gap-12 '>
          <div>
            <h1 className='font-semibold text-lg bg-pink-600 py-3 px-4 w-fit rounded-lg '>Heigth Finder</h1>
            <form className='mt-3' onSubmit={findHeight}>
              <input 
                required
                type="number" 
                name='width'
                className='border border-blue-400 p-3 rounded '
                placeholder='Width'
              />
              <button className='flex hover:scale-105 transition-transform duration-300 items-center bg-cyan-700 text-white gap-1 p-2 rounded mt-3'>
                Find
                <ArrowRight />
              </button>
            </form>

            <h1 className='mt-4 text-xl font-semibold'>Height suggestion : <span className='bg-red-500 px-2 py-0.5 rounded'>{suggestedHeight}</span> </h1>
          </div>

          <div>
            <h1 className='font-semibold text-lg bg-green-600 py-3 px-4 w-fit rounded-lg '>Width Finder</h1>
            <form className='mt-3' onSubmit={findWidth}>
              <input 
                required
                type="number" 
                name='height'
                className='border border-blue-400 p-3 rounded '
                placeholder='Height'
              />
              <button className='flex hover:scale-105 transition-transform duration-300 items-center bg-blue-600 text-white gap-1 p-2 rounded mt-3'>
                Find
                <ArrowRight />
              </button>
            </form>

            <h1 className='mt-4 text-xl font-semibold'>Width suggestion : <span className='bg-red-500 px-2 py-0.5 rounded'>{suggestedWidth}</span>  </h1>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
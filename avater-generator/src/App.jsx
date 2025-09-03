import React, { useEffect, useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import 'animate.css';
import { toast, ToastContainer } from 'react-toastify'

const data = [
  {
    label: "Illustration",
    value: "illustration",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed="
  },
  {
    label: "Cartoon",
    value: "cartoon",
    url: "https://api.dicebear.com/7.x/adventurer/svg?seed="
  },
  {
    label: "Sketchy",
    value: "sketchy",
    url: "https://api.dicebear.com/7.x/croodles/svg?seed="
  },
  {
    label: "Robots",
    value: "robots",
    url: "https://api.dicebear.com/7.x/bottts/svg?seed="
  },
  {
    label: "Art",
    value: "art",
    url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=12"
  },
  {
    label: "Male",
    value: "male",
    url: "https://randomuser.me/api/portraits/men"
  },
  {
    label: "Female",
    value: "female",
    url: "https://randomuser.me/api/portraits/women"
  }
]

const App = () => {

  const [src, setSrc] = useState(null)
  const [option, setOption] = useState("male")

  const generateRandomNumber = ()=> {
    const num = Math.floor(Math.random() * 99) + 1
    return num
  }

  const generate = ()=> {
    const obj = data.find((item)=> item.value === option)
    const url = obj.url
    if(option === "male" || "female"){
      const imageUrl = `${url}/${generateRandomNumber()}.jpg`
      setSrc(imageUrl)
    }
    else{
      const uniqueValue = Date.now()
      const imageUrl = `${url}${uniqueValue}`
      setSrc(imageUrl)
    }
  }

  const onOptionChange = (e)=> {
    setOption(e.target.value)
  }
  
  const download = (url)=> {
    const a = document.createElement("a")
    a.href = url
    a.download = `${Date.now()}.jpg`
    a.click()
    a.remove()
  }

  const copy = (url)=> {
    navigator.clipboard.writeText(url)
    toast.success("Image Url Copied", {position: "top-center"})
  }
  
  useEffect(()=> {
    generate()
  },[option])

  return (
    <div className='animate__animated animate__fadeIn overflow-hidden min-h-screen flex text-white items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' >
      <div className='animate__animated animate__slideInUp gap-6 flex flex-col items-center w-full max-w-md rounded-2xl shadow-xl backdrop-blur-2xl border border-slate-700 p-10 '>
        <img 
          src={src || "/avt.png"}          alt="avater"
          className='w-32 h-32 rounded-full border-4 border-slate-700 shadow-lg object-cover ' 
        />
        <div className='text-center'>
          <h1 className='font-medium text-3xl tracking-wide'>Avatar Generator</h1>
          <p className='text-slate-300'>Generate Unlimited avaters for your website</p>
        </div>

        <div className='w-full space-y-4'>
          <select className='bg-slate-900/60 w-full p-3 rounded-xl' name="" value={option} onChange={onOptionChange}>
            {
              data.map((item, index)=> (
                <option key={index} value={item.value} >{item.label} </option>
              ))
            }
          </select>

          <div className='bg-slate-900/60 w-full p-3 rounded-xl'>
            {src}
          </div>
        </div>

        <div className='flex gap-4 w-full'>
          <button onClick={generate} className='flex-1 bg-gradient-to-r from-rose-500 to-orange-600 font-medium rounded-lg px-4 py-2 hover:scale-105 transition-transform'>
            <i className="ri-arrow-right-up-line mr-1"></i>
            Change
          </button>

          <button onClick={()=> download(src)} className='flex-1 bg-gradient-to-r from-green-500 to-cyan-600 font-medium rounded-lg px-4 py-2 hover:scale-105 transition-transform'>
            <i className="ri-download-line mr-1"></i>
            Download
          </button>

          <button onClick={()=> copy(src)} className='flex-1 bg-gradient-to-r from-yellow-500 to-amber-600 font-medium rounded-lg px-4 py-2 hover:scale-105 transition-transform'>
            <i className="ri-file-copy-line mr-1"></i>
            Copy
          </button>
        </div>

      </div>
      <ToastContainer />
    </div>
  )
}

export default App
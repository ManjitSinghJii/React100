import React from 'react'
import 'remixicon/fonts/remixicon.css'
import 'animate.css';

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
  return (
    <div className='animate__animated animate__fadeIn overflow-hidden min-h-screen flex text-white items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' >
      <div className='animate__animated animate__slideInUp gap-6 flex flex-col items-center w-full max-w-md rounded-2xl shadow-xl backdrop-blur-2xl border border-slate-700 p-10 '>
        <img 
          src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-man-avatar-with-circle-frame-vector-ilustration-png-image_6110328.png" 
          alt="avater"
          className='w-32 h-32 rounded-full border-4 border-slate-700 shadow-lg object-cover ' 
        />
        <div className='text-center'>
          <h1 className='font-medium text-3xl tracking-wide'>Avatar Generator</h1>
          <p className='text-slate-300'>Generate Unlimited avaters for your website</p>
        </div>

        <div className='w-full space-y-4'>
          <select className='bg-slate-900/60 w-full p-3 rounded-xl' name="" id="">
            {
              data.map((item, index)=> (
                <option key={index} value={item.value} >{item.label} </option>
              ))
            }
          </select>

          <div className='bg-slate-900/60 w-full p-3 rounded-xl'>
            http://localhost:27017
          </div>
        </div>

        <div className='flex gap-4 w-full'>
          <button className='flex-1 bg-gradient-to-r from-rose-500 to-orange-600 font-medium rounded-lg px-4 py-2 hover:scale-105 transition-transform'>
            <i className="ri-arrow-right-up-line mr-1"></i>
            Change
          </button>

          <button className='flex-1 bg-gradient-to-r from-green-500 to-cyan-600 font-medium rounded-lg px-4 py-2 hover:scale-105 transition-transform'>
            <i className="ri-download-line mr-1"></i>
            Download
          </button>

          <button className='flex-1 bg-gradient-to-r from-yellow-500 to-amber-600 font-medium rounded-lg px-4 py-2 hover:scale-105 transition-transform'>
            <i className="ri-file-copy-line mr-1"></i>
            Copy
          </button>
        </div>

      </div>
    </div>
  )
}

export default App
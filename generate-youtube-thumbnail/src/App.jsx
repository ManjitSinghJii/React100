import React from 'react'
import 'remixicon/fonts/remixicon.css'
import 'animate.css';

const App = () => {
  return (
    <div className='min-h-screen bg-gray-200 py-8'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-pink-500'>Youtube thumbnail Downloader</h1>
        <form className='space-x-4 mt-8' >
          <input
            className='bg-white p-3 rounded-lg w-[450px] '
            placeholder='Enter youtub videos url...'
            required
          />
          <button className='p-3 rounded-lg hover:scale-92 transition-transform duration-300 text-white font-medium bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500'>
            <i className="ri-download-fill mr-1"></i>
            Download
          </button>
        </form>
      </div>

      <div className=''>

      </div>
    </div>
  )
}

export default App
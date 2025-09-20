import React, { createElement, useState } from 'react'
import 'animate.css';
import { ReactPhotoEditor } from "react-photo-editor"
import { Upload } from "lucide-react"

const App = () => {

  const [file, setFile] = useState(null)
  const [open, setOpen] = useState(false)

  const chooseImage = ()=> {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.click()

    input.onchange = ()=> {
      const file = input.files[0]
      setFile(file)
      setOpen(true)
    }

    input.remove()
  }

  const handleClose = ()=> {
    setOpen(false)
    setFile(null)
  }

  const onSave = (editedPhoto)=> {
    const url = URL.createObjectURL(editedPhoto)
    const a = document.createElement("a")
    a.href = url
    a.download = "save.png"
    a.click()

    a.remove()
  }

  return (
    <div className='animate__animated animate__fadeIn h-screen flex items-center justify-center bg-[linear-gradient(285deg,_#fbc2eb,_#a6c1ee)]'>
      <div onClick={chooseImage} className='text-blue-600 animate__animated animate__flipInX cursor-pointer active:scale-80 bg-white p-8 shadow-lg w-lg rounded-xl hover:scale-105 duration-300 flex flex-col items-center'>
        <Upload className='w-14 h-14'/>
        <span className='text-3xl font-semibold '>Choose your image</span>
      </div>
      <ReactPhotoEditor 
        open={open}
        file={file}
        onClose={handleClose}
        onSaveImage={onSave}
      />
    </div>
  )
}

export default App
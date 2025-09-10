import React, { useRef, useState } from 'react'
import {Button, Form, Input, Modal, QRCode} from "antd"
import { CreativeCommons, Download, QrCode } from "lucide-react"
import { useForm } from 'antd/es/form/Form'

const App = () => {

  const [form] = useForm()
  const [open, setOpen] = useState(false)
  const [icon, setIcon] = useState("")
  const [qr, setQR] = useState({
    url: "https://github.com/ManjitSinghJii",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwFDFUTaIwOGiOw91gfGlhXi0_i9zdw7J6Dw&s",
    bgColor: "white",
    color: "black"
  })

  const divRef = useRef(null)

  const downloadNow = ()=> {
    const div = divRef.current
    const canvas = div.querySelector("canvas")
    const base64String = canvas.toDataURL("image/png")
    const a = document.createElement("a")
    a.href = base64String
    a.download = "qr.png"
    a.click()
    a.remove()
  }

  const generateQR = (value)=> {
    console.log(value);
    
    value.url = value.url || "https://github.com/ManjitSinghJii"
    value.bgColor = value.bgColor || "white"
    value.color = value.color || "black"
    value.icon = icon
    setOpen(false)
    setQR((prev)=>({
      ...prev,
      ...value
    }))
  }

  const chooseFile = (e)=> {
    const file = e.target.files[0]    
    const url = URL.createObjectURL(file)
    setIcon(url) 
  }

  const handleClose = ()=> {
    setOpen(false)
    form.resetFields()
    setIcon("")
  }

  return (
    <div className='bg-gray-100 h-screen py-12 flex flex-col items-center justify-center'>
      <h1 className='text-4xl font-medium mb-10'>Generate - QR Code</h1>
      <div ref={divRef} className='rounded-xl p-4 w-fit bg-white shadow-lg hover:scale-101 transition-transform duration-400 hover:shadow-2xl'>
        <QRCode 
          value={qr.url}
          size={400}
          icon={qr.icon}
          bgColor={qr.bgColor}
          color={qr.color}
        />
      </div>
      <div className='mt-4 flex justify-around items-center gap-4'>
        <button className=' px-3 flex items-center  gap-2 py-2 bg-gradient-to-br from-green-400 via-green-600 to-cyan-400 hover:scale-105 transition-transform duration-300 text-white font-bold rounded-lg' onClick={()=> setOpen(true)}><QrCode /> Generate QR</button>
        <button className=' px-3 flex items-center  gap-2 py-2 bg-gradient-to-br from-indigo-500 via-pink-600 to-blue-600 hover:scale-105 transition-transform duration-300 text-white font-bold rounded-lg' onClick={downloadNow}><Download /> Download QR</button>
      </div>

      <Modal open={open} footer={null} onCancel={handleClose} >
        <h1 className='text-lg font-medium mb-4'>Genetare Your QR</h1>
        <Form onFinish={generateQR} form={form}>
          <Form.Item
            label={<h1 className='text-lg font-medium text-gray-700'>URL</h1>}
            rules={[{required: true, type: "url"}]}
            name="url"
          >
            <Input 
              size='large'
              placeholder='https://domain.com'
            />
          </Form.Item>

          <Form.Item
            label={<h1 className='text-lg font-medium text-gray-700'>Bg Color</h1>}
            name="bgColor"
          >
            <Input 
              type="color"
              size='large'
            />
          </Form.Item>

          <Form.Item
            label={<h1 className='text-lg font-medium text-gray-700'>Color</h1>}
            name="color"
          >
            <Input 
              type="color"
              size='large'
            />
          </Form.Item>

          <Form.Item
            label={<h1 className='text-lg font-medium text-gray-700'>Logo</h1>}
            name="logo"
          >
            <Input 
              type="file"
              size='large'
              accept='image/*'
              onChange={chooseFile}
            />
          </Form.Item>

          <Form.Item>
            <Button size='large' type="primary" htmlType="submit" >Generate</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default App
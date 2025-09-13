import React, { useState } from 'react'
import 'animate.css';
import {toast, ToastContainer} from "react-toastify"
import {SendHorizontal} from "lucide-react"
import axios from "axios"
import moment from "moment"
const API_KEY = "AIzaSyAI-gXw9qCNOtusC-Z2qynG_tNPN3vU_7o"

const App = () => {

  const [message, setMessage] = useState("")
  const [chats, setChats] = useState([])
  const [isTyping, setTyping] = useState(false)

  const createChat =  async (e)=> {
    try{
      e.preventDefault()
      setChats((prev)=>[
        ...prev,
        {
        sender: "me",
        message: message,
        createdAt: new Date()
      }])

      setTyping(true)
      const payload = {
        contents: {
          parts: {
            text: `Answer this in short - ${message}`
          }
        }
      }
      const options = {
        headers: {
          "X-goog-api-key" : API_KEY
        }
      }
      const {data} = await axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", payload, options)
      const aiResult = data.candidates[0].content.parts[0].text;
      setChats((prev)=>[
        ...prev,
        {
        sender: "ai",
        message: aiResult,
        createdAt: new Date()
      }])
    }
    catch(err){
      toast.error(err.message)
    }
    finally{
      setTyping(false)
      setMessage("")
    }

  }

  return (
    <div className='bg-slate-900 min-h-screen'>
      <div className='lg:w-9/12 mx-auto bg-gray-700 min-h-screen'>
        <h1 className='text-3xl font-bold text-center py-12 text-white'>🤖 Ai ChatBot</h1>

        <div className='p-8 bg-gray-800 pb-45 space-y-5'>
          {
            chats.map((item, index)=> (
              <div key={index}>
                {
                  item.sender === "me" &&
                  <div className='flex flex-col gap-2 justify-start animate__animated animate__fadeIn'>
                    <div className='bg-rose-100 text-rose-500 font-medium px-6 py-3 rounded-xl w-9/12'>
                      {item.message}
                      <div className='flex justify-end text-gray-500 text-xs'>
                        <label>{moment(item.createdAt).format("DD MMM YYYY, hh:mm:ss A")} </label>
                      </div>
                    </div>
                  </div>
                }

                {
                  item.sender === "ai" &&
                  <div className='flex flex-col gap-2 items-end animate__animated animate__fadeIn'>
                    <div className='bg-green-100 text-green-500 font-medium px-6 py-3 rounded-xl w-9/12'>
                      {item.message}
                        <div className='flex justify-end text-gray-500 text-xs'>
                          <label>{moment(item.createdAt).format("DD MMM YYYY, hh:mm:ss A")} </label>
                        </div>
                    </div>
                  </div>
                }

              </div>
            ))
          }

        {
          isTyping && 
          <div className='text-right'>
            <small className='text-gray-400 font-medium animate__animated animate__fadeIn'>Typing...</small>
          </div>
        }
        </div>

        <div className='bg-indigo-400 p-4 fixed bottom-0 lg:w-9/12 w-full'>
          <form className='flex gap-4' onSubmit={createChat}>
            <input 
              required
              // value={message}
              className='bg-white rounded-xl p-4 font-medium w-full '
              placeholder='Enter Your message'
              onChange={(e)=> setMessage(e.target.value.trim())}
            />
            <button className='bg-blue-600 lg:p-6 p-4 hover:bg-blue-500 transition-transform hover:scale-90 duration-300 rounded-full text-white'>
              <SendHorizontal />
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
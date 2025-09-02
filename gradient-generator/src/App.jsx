import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  const [num, setNum] = useState(12)
  const [type, setType] = useState("linear")
  const [gradients, setGradients] = useState([])

  const getHexColorCode = ()=> {
    const rgb = 255*255*255
    const random = Math.random() * rgb
    const int = Math.floor(random);
    const hexCode = int.toString(16)
    const colorHex = hexCode.padStart(6, "0")
    return `#${colorHex}` 
  }

  const generateGradient = ()=> {
    const colors = []
    for(let i=0; i<num; i++)
    {
      const color1 = getHexColorCode()
      const color2 = getHexColorCode()
      const degree = Math.floor(Math.random() * 360)
      const degreeString = `${degree}deg`
      if(type === "linear"){
        colors.push({
          gradient:  `linear-gradient(${degreeString}, ${color1}, ${color2})`,
          css: `background: 'linear-gradient(${degreeString}, ${color1}, ${color2})'`
        })
      }
      else{
        colors.push({
          gradient:  `radial-gradient(circle, ${color1}, ${color2})`,
          css: `background: 'radial-gradient(circle, ${color1}, ${color2})'`
        })
      }
    }
    setGradients(colors)  
  }

  useEffect(()=>{
    generateGradient()
  },[num, type])

  const onCopy = (css)=> {
    navigator.clipboard.writeText(css)
    toast.success("Copied Successfull", {position: 'top-center'})
  }
  return (
    <div className='min-h-screen bg-white py-12'>
      <div className='w-9/12 mx-auto space-y-8'>
        <div 
          className='flex justify-between p-6 rounded-xl'
          style={{
            background: getHexColorCode()
          }}
        >
          <h1 className='text-3xl font-bold text-zinc-700 '>🎨 Gradient Genetator - {num} - {type} </h1>
          <div className='flex gap-4'>
            <input 
            value={num}
              type="text" 
              placeholder='12' 
              className='border border-slate-300 rounded-lg p-2 w-[100px] ' 
              onChange={(e)=>setNum(Number(e.target.value)) }
            />
            <select onChange={(e)=> setType(e.target.value)} value={type} name="" id="" className='border border-slate-300 rounded-lg p-2 w-[100px] ' >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>
            <button onClick={generateGradient} className='px-14 py-2 bg-pink-500 rounded text-white font-medium'>Generate</button>
          </div>
        </div>

        <div className='grid grid-cols-4  gap-4 '>
          {
            gradients.map((item, index)=> (
              <div 
              key={index}
                className='h-[180px] rounded-xl relative '
                style={{
                  background: item.gradient
                }}
              >
                <button onClick={()=> onCopy(item.css)} className='bg-black/50 hover:bg-black text-white rounded absolute right-3 bottom-3 text-xs py-1 px-2 capitalize'>Copy</button>
              </div>
            ))
          }
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
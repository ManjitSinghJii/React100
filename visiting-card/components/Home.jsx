"use client"
import { Download, Image } from 'lucide-react'
import React, { useRef, useState } from 'react'
import html2canvas from 'html2canvas'

const Home = () => {

    const divRef = useRef(null)
    const [inputType, setInputType] = useState(null)
    const [card, setCard] = useState({
        image: null,
        title: {label: null, left: 20, top: 30},
        subtitle: {label: null, left: 20, top: 50},
        small: {label: null, left: 20, top: 70}
    })
    const addImage = (e)=> {
        const input = e.target
        const file = input.files[0]
        const url = URL.createObjectURL(file)
        setCard({
            ...card,
            image: url
        })
    }

    const onSubmit = (e)=> {
        e.preventDefault()
        const value = e.target[0].value.trim()
        setCard({
            ...card,
            [inputType]: {
                ...card[inputType],
                label: value
            }
        })
    }

    const addText = (type)=> {
        setInputType(inputType === type ? null : type)
    }

    const download = async ()=> {
        const div = divRef.current
        const canvas = await html2canvas(div, 3)
        const url = canvas.toDataURL("image/png")
        const a = document.createElement('a')
        a.href = url
        a.target = "_blank"
        a.download = "card.png"
        a.click()

        a.remove()
    }

    const onDragEnd = (e, inputType)=> {
        const dragX = e.clientX
        const dragY = e.clientY
        const div = divRef.current
        const rec = div.getBoundingClientRect()
        const leftPosition = Math.max(0, Math.round(dragX - rec.left))
        const topPosition = Math.max(0, Math.round(dragY - rec.top))

        setCard({
            ...card,
            [inputType]: {
                ...card[inputType],
                left: leftPosition,
                top: topPosition
            }
        })
    }

  return (
    <div className='bg-gray-200 h-screen flex items-center justify-center'>
        <div className='bg-white rounded-xl  p-4 grid grid-cols-4 gap-x-12 gap-y-6 shadow-lg items-center'>
            {
                inputType &&
                <form onSubmit={onSubmit} className='col-span-4 flex gap-3' >
                    <input type="text" 
                        className='border border-gray-300 rounded px-3 py-2 flex-1 '
                        placeholder={`Enter ${inputType === null ? "Content" : inputType} here...`}
                        required
                    />
                    <button className='px-6 py-2 bg-cyan-400 text-white rounded'>Add</button>
                </form>
            }
            <button className='relative border-blue-500 rounded-xl w-18 h-18 flex border-2 items-center justify-center hover:bg-blue-100 hover:scale-120 duration-300'>
                <Image className='w-8 h-8 rounded-lg text-blue-500'/>
                <input 
                    type="file"
                    className='w-full h-full absolute top-0 left-0 opacity-0 '
                    onChange={addImage}
                    accept='image/*'
                />
            </button>

            <button onClick={()=>addText("title")} className='text-xl text-rose-600 rounded-xl font-semibold border-rose-600 w-18 h-18 flex border-2 items-center justify-center hover:bg-rose-100 hover:scale-115 duration-300'>
                Title
            </button>

            <button onClick={()=>addText("subtitle")} className='font-semibold border-green-600 text-green-600 rounded-xl w-18 h-18 flex border-2 items-center justify-center hover:bg-green-100 hover:scale-110 duration-300'>
                Subtitle
            </button>

            <button onClick={()=>addText("small")} className='font-medium text-sm border-cyan-600 text-cyan-600 rounded-xl w-18 h-18 flex border-2 items-center justify-center hover:bg-cyan-100 hover:scale-105 duration-300'>
                Small
            </button>

            <div ref={divRef} className={`p-8 overflow-hidden relative flex items-center justify-center ${!(card.image || card.title || card.subtitle || card.small) && 'border-2 border-gray-400 border-dashed '} col-span-4 rounded-lg h-[250px] `}>
                {
                    (card.image || card.title.label || card.subtitle.label || card.small.label) ?
                    <>
                        <img src={card.image} alt="image" className='w-full h-full rounded-lg object-cover  absolute top-0 left-0' />
                        <h1 onDragEnd={(e)=>onDragEnd(e, "title")} draggable className='text-white cursor-move absolute font-semibold  text-2xl ' style={{top: card.title.top, left: card.title.left}}>{card.title.label}</h1>
                        <h1 onDragEnd={(e)=>onDragEnd(e, "subtitle")} draggable className='text-white cursor-move absolute text-base ' style={{top: card.subtitle.top, left: card.subtitle.left}}>{card.small.label} </h1>
                        <h1 onDragEnd={(e)=>onDragEnd(e, "small")} draggable className='text-white cursor-move absolute font-semibold  text-lg ' style={{top: card.small.top, left: card.small.left}}>{card.subtitle.label} </h1>
                    </>
                    :
                    <h1 className='text-lg text-gray-500 font-medium'>Visiting Card</h1>
                }
            </div>

            <button onClick={download} className='bg-blue-500 p-3 flex items-center justify-center font-medium text-white rounded gap-2 col-span-4 '>
                <Download />
                Download
            </button>
        </div>
    </div>
  )
}

export default Home
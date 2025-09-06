import React, { useEffect, useState } from 'react'
import 'animate.css';
import 'remixicon/fonts/remixicon.css'
import '@ant-design/v5-patch-for-react-19';
import { Badge, Button, Card, Form, Input, Modal, Select, Tag } from "antd"
import { Plus } from "lucide-react"

const App = () => {

  const [open, setOpen] = useState(false)
  const [timer, setTimer] = useState(new Date().toLocaleTimeString())

  const createTask = (value)=> {
    console.log(value)
  }

  const handleClose = ()=> {
    setOpen(false)
  }

  useEffect(()=> {
    const interval =  setInterval(()=>{
      setTimer(new Date().toLocaleTimeString())
    },1000)

    return ()=> {
      clearInterval(interval)
    }
  },[])

  return (
    <div className='bg-gray-200 h-screen overflow-hidden'>
      <nav className='bg-white h-[60px] fixed top-0 left-0 w-full flex justify-between items-center px-8 '>
        <div className='flex items-center'>
          <button className='w-10 h-10 bg-[radial-gradient(circle_at_center,_#00c6ff_0%,_#0072ff_50%,_hsl(237.3,_78.4384552963829%,_46.435774028573626%)_100%)] rounded-full text-xl font-medium text-white'>PL</button>
          <h1 className='text-xl font-bold  px text-blue-600'>anner</h1>
        </div>

        <h1 className='text-2xl font-bold'>{timer} </h1>
      </nav>

      <section className='fixed top-[60px] p-8 left-0 h-[calc(100%-120px)] w-full overflow-x-auto overflow-y-hidden grid grid-cols-3 gap-8'>
        <div className='h-full min-h-0'>
          <Badge.Ribbon 
            text="Highest" 
            className='z-200 font-medium bg-gradient-to-br !from-indigo-600 !via-pink-500  !to-rose-500 ' 
          />
            <div className='bg-white rounded-lg h-full min-h-0 overflow-auto p-6 '>
              <button onClick={()=> setOpen(true)} className=' hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-blue-600 via-cyan-400 to-indigo-500 text-white flex gap-1 font-medium px-3 text-sm rounded items-center py-2'>
                <Plus  className='h-5 w-5'/>
                Add Task
              </button>
              <div className='flex flex-col gap-8 mt-6'>
                {
                  Array(10).fill(0).map((item, index)=> (
                    <Card key={index} hoverable>
                      <Card.Meta
                        title="Upload videos"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi facilis est aperiam eius eum numquam harum laborum nam odio quas!"
                      />
                      <div className='mt-3 flex justify-between items-center'>
                        <div>
                          <Tag color="blue" >Pending</Tag>
                          <Tag color="magenta-inverse" >Delete</Tag>
                        </div>
                        <Select size="small"  className='' placeholder="Change Status" >
                          <Select.Option value="pending" >Pending</Select.Option>
                          <Select.Option value="inProgress" >In Progress</Select.Option>
                          <Select.Option value="completed" >Completed</Select.Option>
                        </Select>
                      </div>
                    </Card>
                  ))
                }
              </div>
            </div>
        </div>

        <div className='h-full min-h-0'>
          <Badge.Ribbon 
            text="Medium" 
            className='z-20 font-medium bg-gradient-to-br !from-orange-600 !via-yellow-500  !to-amber-500 ' 
          />
            <div className='bg-white rounded-lg h-full min-h-0 overflow-auto p-6 '>
              <button onClick={()=> setOpen(true)} className=' hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-blue-600 via-cyan-400 to-indigo-500 text-white flex gap-1 font-medium px-3 text-sm rounded items-center py-2'>
                <Plus  className='h-5 w-5'/>
                Add Task
              </button>
              <div className='flex flex-col gap-8 mt-6'>
                {
                  Array(10).fill(0).map((item, index)=> (
                    <Card key={index} hoverable>
                      <Card.Meta
                        title="Upload videos"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi facilis est aperiam eius eum numquam harum laborum nam odio quas!"
                      />
                      <div className='mt-3 flex justify-between items-center'>
                        <div>
                          <Tag color="blue" >Pending</Tag>
                          <Tag color="magenta-inverse" >Delete</Tag>
                        </div>
                        <Select size="small"  className='' placeholder="Change Status" >
                          <Select.Option value="pending" >Pending</Select.Option>
                          <Select.Option value="inProgress" >In Progress</Select.Option>
                          <Select.Option value="completed" >Completed</Select.Option>
                        </Select>
                      </div>
                    </Card>
                  ))
                }
              </div>
            </div>
        </div>

        <div className='h-full min-h-0'>
          <Badge.Ribbon 
            text="Lowest" 
            className='z-20 font-medium bg-gradient-to-br !from-cyan-600 !via-green-500  !to-rose-500 ' 
          />
            <div className='bg-white rounded-lg h-full min-h-0 overflow-auto p-6 '>
              <button onClick={()=> setOpen(true)} className=' hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-blue-600 via-cyan-400 to-indigo-500 text-white flex gap-1 font-medium px-3 text-sm rounded items-center py-2'>
                <Plus  className='h-5 w-5'/>
                Add Task
              </button>
              <div className='flex flex-col gap-8 mt-6'>
                {
                  Array(10).fill(0).map((item, index)=> (
                    <Card key={index} hoverable>
                      <Card.Meta
                        title="Upload videos"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi facilis est aperiam eius eum numquam harum laborum nam odio quas!"
                      />
                      <div className='mt-3 flex justify-between items-center'>
                        <div>
                          <Tag color="blue" >Pending</Tag>
                          <Tag color="magenta-inverse" >Delete</Tag>
                        </div>
                        <Select size="small"  className='' placeholder="Change Status" >
                          <Select.Option value="pending" >Pending</Select.Option>
                          <Select.Option value="inProgress" >In Progress</Select.Option>
                          <Select.Option value="completed" >Completed</Select.Option>
                        </Select>
                      </div>
                    </Card>
                  ))
                }
              </div>
            </div>
        </div>
      </section>

      <footer className='bg-white h-[60px] fixed bottom-0 left-0 w-full flex justify-between items-center px-8 '>
        <h1 className='text-2xl font-bold'>{timer} </h1>
        <a target='_blank' href="https://github.com/ManjitSinghJii" className='hover:underline text-gray-400'>Manjit Singh Github</a>
      </footer>
      <Modal open={open} footer={null} onCancel={handleClose} maskClosable={false} >
        <h1 className='mb-4 text-lg font-medium'>New task!</h1>
        <Form onFinish={createTask}>
          <Form.Item
            name="title"
            rules={[{required: true}]}
          >
            <Input 
              placeholder='Task Name'
              size='large'
            />
          </Form.Item>

          <Form.Item
            name="description"
            rules={[{required: true}]}
          >
            <Input.TextArea 
              placeholder='Task Descriptions'
              rows={5}
            />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary" >Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default App
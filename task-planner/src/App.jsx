import React, { useEffect, useState } from 'react'
import 'animate.css';
import 'remixicon/fonts/remixicon.css'
import '@ant-design/v5-patch-for-react-19';
import { Badge, Button, Card, DatePicker, Empty, Form, Input, Modal, Popconfirm, Select, Tag } from "antd"
import { Plus } from "lucide-react"
import { usePlanner } from './store/usePlanner';
import moment from "moment"

const App = () => {

  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [timer, setTimer] = useState(new Date().toLocaleTimeString())
  const {tasks, addTask, deleteTask, updateStatus, deleteAll } = usePlanner()
  const higestTask = tasks.filter((item)=>item.priority === "highest")
  const mediumTask = tasks.filter((item)=>item.priority === "medium")
  const lowestTask = tasks.filter((item)=>item.priority === "lowest")

  const createTask = (value)=> {
    value.status = "pending",
    value.id = Date.now()
    value.createdAt = new Date()
    addTask(value)
    handleClose()
  }

  const handleClose = ()=> {
    setOpen(false)
    form.resetFields()
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
      <nav className='bg-gradient-to-r from-rose-500 via-slate-800 to-slate-900 text-white h-[60px] fixed top-0 left-0 w-full flex justify-between items-center px-8 '>
        <div className='flex items-center'>
          <button className='w-10 h-10 bg-[radial-gradient(circle_at_center,_#00c6ff_0%,_#0072ff_50%,_hsl(237.3,_78.4384552963829%,_46.435774028573626%)_100%)] rounded-full text-xl font-medium text-white'>PL</button>
          <h1 className='text-xl font-bold  px text-blue-600'>anner</h1>
        </div>

        <div className='flex items-center gap-4'>
          <h1 className='text-2xl font-bold lg:block hidden'>{timer} </h1>
          <DatePicker />
          <button onClick={()=> setOpen(true)} className=' hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-blue-600 via-cyan-400 to-indigo-500 text-white flex gap-1 font-medium px-3 text-sm rounded items-center py-2'>
            <Plus  className='h-5 w-5'/>
            Add Task
          </button>

          <Popconfirm title="Do you want to delete all.." onConfirm={deleteAll} >
            <button className=' hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-pink-600 via-red-400 to-pink-500 text-white flex gap-1 font-medium px-3 text-sm rounded items-center py-2'>
              <i className="ri-delete-bin-6-line"></i>
              Deleten All Task
            </button>
          </Popconfirm>
        </div>
      </nav>

      <section className='fixed top-[60px] p-8 left-0 h-[calc(100%-120px)] w-full overflow-x-auto lg:overflow-y-hidden overflow-y-auto grid lg:grid-cols-3 gap-8'>
        <div className='lg:h-full lg:min-h-0 h-[400px] '>
          <Badge.Ribbon 
            text="Highest" 
            className='z-200 font-medium bg-gradient-to-br !from-indigo-600 !via-pink-500  !to-rose-500 ' 
          />
            <div className='bg-white rounded-lg h-full min-h-0 overflow-auto p-6 '>
              <div className='flex flex-col gap-8 mt-6'>
                {
                  higestTask.length === 0 && (
                    <>
                      <Empty description="there is no task added in this planner" />
                      <button onClick={()=> setOpen(true)} className='w-fit mx-auto hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-blue-600 via-cyan-400 to-indigo-500 text-white flex gap-1 font-medium px-3 text-sm rounded items-center py-2'>
                        <Plus  className='h-5 w-5'/>
                        Add Task
                      </button>
                    </>
                  )
                }
                {
                  higestTask.map((item, index)=> (
                    <Card key={index} hoverable>
                      <Card.Meta
                        title={item.title}
                        description={item.description}
                      />
                      <div className='mt-3 flex justify-between items-center'>
                        <div>
                          {
                            item.status === "pending" 
                            &&
                            <Tag color="blue" className='capitalize' >{item.status}</Tag>
                          }
                          {
                            item.status === "inProgress" 
                            &&
                            <Tag color="cyan" className='capitalize' >{item.status}</Tag>
                          }
                          {
                            item.status === "completed" 
                            &&
                            <Tag color="green-inverse" className='capitalize' >{item.status}</Tag>
                          }
                          <Popconfirm title="Do you want to delete this task" onConfirm={()=> deleteTask(item.id)}>
                            <Tag color="magenta-inverse"  >Delete</Tag>
                          </Popconfirm>
                        </div>
                        <Select size="small"  className='' placeholder="Change Status"  onChange={(status)=>updateStatus(item.id, status) }>
                          <Select.Option value="pending" >Pending</Select.Option>
                          <Select.Option value="inProgress" >In Progress</Select.Option>
                          <Select.Option value="completed" >Completed</Select.Option>
                        </Select>
                      </div>
                      <label className='text-slate-600 text-xs flex mt-3'>{moment(item.createdAt).format("DD MMM YYYY hh mm A")} </label>
                    </Card>
                  ))
                }
              </div>
            </div>
        </div>

        <div className='lg:h-full lg:min-h-0 h-[400px]'>
          <Badge.Ribbon 
            text="Medium" 
            className='z-20 font-medium bg-gradient-to-br !from-orange-600 !via-yellow-500  !to-amber-500 ' 
          />
            <div className='bg-white rounded-lg h-full min-h-0 overflow-auto p-6 '>
              <div className='flex flex-col gap-8 mt-6'>
                {
                  mediumTask.length === 0 && (
                    <>
                      <Empty description="there is no task added in this planner" />
                      <button onClick={()=> setOpen(true)} className='w-fit mx-auto hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-blue-600 via-cyan-400 to-indigo-500 text-white flex gap-1 font-medium px-3 text-sm rounded items-center py-2'>
                        <Plus  className='h-5 w-5'/>
                        Add Task
                      </button>
                    </>
                  )
                }
                {
                  mediumTask.map((item, index)=> (
                    <Card key={index} hoverable>
                      <Card.Meta
                        title={item.title}
                        description={item.description}
                      />
                      <div className='mt-3 flex justify-between items-center'>
                        <div>
                          {
                            item.status === "pending" 
                            &&
                            <Tag color="blue" className='capitalize' >{item.status}</Tag>
                          }
                          {
                            item.status === "inProgress" 
                            &&
                            <Tag color="cyan" className='capitalize' >{item.status}</Tag>
                          }
                          {
                            item.status === "completed" 
                            &&
                            <Tag color="green-inverse" className='capitalize' >{item.status}</Tag>
                          }
                          <Popconfirm title="Do you want to delete this task" onConfirm={()=> deleteTask(item.id)}>
                            <Tag color="magenta-inverse"  >Delete</Tag>
                          </Popconfirm>
                        </div>
                        <Select size="small"  className='' placeholder="Change Status"  onChange={(status)=>updateStatus(item.id, status) }>
                          <Select.Option value="pending" >Pending</Select.Option>
                          <Select.Option value="inProgress" >In Progress</Select.Option>
                          <Select.Option value="completed" >Completed</Select.Option>
                        </Select>
                      </div>
                      <label className='text-slate-600 text-xs flex mt-3'>{moment(item.createdAt).format("DD MMM YYYY hh mm A")} </label>
                    </Card>
                  ))
                }
              </div>
            </div>
        </div>

        <div className='lg:h-full lg:min-h-0 h-[400px]'>
          <Badge.Ribbon 
            text="Lowest" 
            className='z-20 font-medium bg-gradient-to-br !from-cyan-600 !via-green-500  !to-rose-500 ' 
          />
            <div className='bg-white rounded-lg h-full min-h-0 overflow-auto p-6 '>
              <div className='flex flex-col gap-8 mt-6'>
                {
                  lowestTask.length === 0 && (
                    <>
                      <Empty description="there is no task added in this planner" />
                      <button onClick={()=> setOpen(true)} className='w-fit mx-auto hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-blue-600 via-cyan-400 to-indigo-500 text-white flex gap-1 font-medium px-3 text-sm rounded items-center py-2'>
                        <Plus  className='h-5 w-5'/>
                        Add Task
                      </button>
                    </>
                  )
                }
                {
                  lowestTask.map((item, index)=> (
                    <Card key={index} hoverable>
                      <Card.Meta
                        title={item.title}
                        description={item.description}
                      />
                      <div className='mt-3 flex justify-between items-center'>
                        <div>
                          {
                            item.status === "pending" 
                            &&
                            <Tag color="blue" className='capitalize' >{item.status}</Tag>
                          }
                          {
                            item.status === "inProgress" 
                            &&
                            <Tag color="cyan" className='capitalize' >{item.status}</Tag>
                          }
                          {
                            item.status === "completed" 
                            &&
                            <Tag color="green-inverse" className='capitalize' >{item.status}</Tag>
                          }
                          <Popconfirm title="Do you want to delete this task" onConfirm={()=> deleteTask(item.id)}>
                            <Tag color="magenta-inverse"  >Delete</Tag>
                          </Popconfirm>
                        </div>
                        <Select size="small"  className='' placeholder="Change Status"  onChange={(status)=>updateStatus(item.id, status) }>
                          <Select.Option value="pending" >Pending</Select.Option>
                          <Select.Option value="inProgress" >In Progress</Select.Option>
                          <Select.Option value="completed" >Completed</Select.Option>
                        </Select>
                      </div>
                      <label className='text-slate-600 text-xs flex mt-3'>{moment(item.createdAt).format("DD MMM YYYY hh mm A")} </label>
                    </Card>
                  ))
                }
              </div>
            </div>
        </div>
      </section>

      <footer className='bg-gradient-to-l from-rose-500 via-slate-800 to-slate-900 text-white h-[60px] fixed bottom-0 left-0 w-full flex justify-between items-center px-8 '>
        <h1 className='text-2xl font-bold'>Total Task {tasks.length} </h1>
        <a target='_blank' href="https://github.com/ManjitSinghJii" className='hover:underline text-white'>Manjit Singh Github</a>
      </footer>
      <Modal open={open} footer={null} onCancel={handleClose} maskClosable={false} >
        <h1 className='mb-4 text-lg font-medium'>New task!</h1>
        <Form onFinish={createTask} form={form}>
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

          <Form.Item
            name="priority"
            rules={[{required: true}]}
          >
            <Select size='large' placeholder="Select Priority" >
              <Select.Option value="highest" >Highest</Select.Option>
              <Select.Option value="medium" >Medium</Select.Option>
              <Select.Option value="lowest" >Lowest</Select.Option>
            </Select>
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
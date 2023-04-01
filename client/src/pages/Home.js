import React from 'react'
import TodoContainer from '../components/TodoContainer'
const Home = () => {
  return (
    <div id='Main'>
        <div id='Header' className='flex justify-center items-center mt-12'>
            <h1 className='text-5xl text-white font-bold'>ToDo List</h1>
        </div>
        <div id='' className='my-14 '>
            <div className='flex justify-center items-center'>
                <div className='flex justify-center items-start bg-black/40 rounded-lg h-[500px] w-[500px]'>
                    <TodoContainer/>
                </div>
            
            </div>
        </div>
    </div>
  )
}

export default Home
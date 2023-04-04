import React from 'react'
import TodoContainer from '../components/TodoContainer'
const Home = () => {
  return (
    <div id='Main'>
        <div id='Header' className='flex justify-center items-center mt-12'>
            <h1 className='text-5xl text-white font-thin'>TODO LIST</h1>
        </div>
        <div id='' className='my-14 '>
            <div className='flex justify-center items-center'>
                <div id='container' className='relative h-[700px] w-[400px] bg-gray-800 rounded-md'>
                    <div className='absolute h-[700px] w-[400px] shadow-md bg-gradient-to-r from-pink-500 via-violet-500 to-pink-500 p-[4px] blur'></div>
                    <div className='absolute h-full w-full flex items-start justify-center bg-black-100 rounded-md'>
                        <TodoContainer/>
                    </div>
                </div>
            
            </div>
        </div>
    </div>
  )
}

export default Home
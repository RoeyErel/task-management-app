import React from 'react'
import TodoContainer from '../components/TodoContainer'
const Home = () => {
  return (
    <div id='Main' className='w-full h-full'>
        <div id='Header' className='flex justify-center items-center pt-12'>
            <h1 className='text-5xl md:text-4xl sm:text-3xl text-white font-thin'>TODO LIST</h1>
        </div>
        <div id='Home-Todo-Container' className='pt-10 md:py-6 sm:py-4'>
            <div id='outer-container' className='flex justify-center items-center'>
                <div id='inner-container' className='relative h-[700px] sm:h-[500px] w-[800px] sm:w-[300px] md:w-[400px] bg-gray-800 rounded-md'>
                    <div className='absolute h-[700px] sm:h-[500px] w-[800px] sm:w-[300px] md:w-[400px] shadow-md bg-gradient-to-r from-pink-500 via-violet-500 to-pink-500 p-[4px] blur'></div>
                    <div id='Todo-component' className='absolute h-full w-full flex items-start justify-center bg-black-100 rounded-md'>
                        <TodoContainer/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home
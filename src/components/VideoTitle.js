import React from 'react'
import { FaPlay } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";

const VideoTitle = ({title,overview}) => {
  return (
    <div className='w-screen aspect-video pt-[15%]  px-6 md:px-24 absolute text-white bg-gradient-to-r from-black'>
       <h1 className=' text-2xl md:text-3xl font-bold'>{title}</h1>
       <p className='hidden md:inline-block py-6 text-lg w-1/4'>{overview}</p>
       <div className='flex gap-2 my-4 md:m-0'>
        <button className='hidden md:inline-block mx-2 my-4 bg-white text-black py-4 md:py-4  md:px-12 text-xl flex gap-1  rounded-lg hover hover:bg-opacity-80'><FaPlay size={23} className='mt-1'/> Play</button>
        <button className='hidden md:inline-block mx-2 my-4 bg-gray-500 text-white p-4 px-12 text-xl flex gap-1 bg-opacity-50 rounded-lg hover hover:bg-opacity-80'><CiCircleInfo size={23} className='mt-1'/>More Info</button>
       </div>
    </div>
  )
}

export default VideoTitle
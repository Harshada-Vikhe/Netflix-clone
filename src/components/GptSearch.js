import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'
import { BG_URL } from '../utils/constant'


const GptSearch = () => {
  return (
   <>
    <div className="fixed -z-20">
        <img  className='h-screen object-cover w-screen'
        src={BG_URL} alt="backgroung image" />
      </div>
    <div className=''>
      
        <GptSearchBar/>
        <GptMovieSuggestion/>

    </div>
    </>
  )
}

export default GptSearch
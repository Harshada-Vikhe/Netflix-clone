import React, { useRef } from "react";
import lang from "../utils/languageConstant";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constant";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
    const langKey= useSelector(store=>store.config.lang)
    const dispatch= useDispatch();

    const searchText= useRef(null);
  
    const searchMovieTMDB = async(movie)=>{
      const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&language=en-US&page=1',API_OPTIONS)

      if (!data.ok) {
        if (data.status === 401) {
          throw new Error('API key usage exceeded. Please try again later.');
        } else {
          throw new Error(`HTTP error! status: ${data.status}`);
        }
      };

    const json = await data.json()
    
    return json.results;
    
    }



    const handleGptSearchClick= async()=>{
       

       //make an api call to GPT and get movie results
     try{  const gptQuery='At as a Movie Recommendation System and support some movies for the query : ' + searchText.current.value + '. only give me names of 5 movies, comma separated like the example result given ahead.Example Result : Gadar,Sholay,Don,Golmaal, Koi Mil Gaya';
       
       
       
       const gptResults = await openai.chat.completions.create({
        messages: [{ role: 'user', content: gptQuery }],
        model: 'gpt-3.5-turbo',
      });

      if(!gptResults){
        // handle error
        throw new Error('Failed to get recommendations from GPT-3.5');
       } 
       const gptMovies = gptResults.choices?.[0]?.message?.content.split(',').map(movie => movie.trim());

        return gptMovies;
        } catch (error) {
    console.error('Error fetching GPT recommendations:', error);
    return null;
   
      }
      

      //  const gptMovies= gptResults.choices?.[0]?.message?.content.split(',');

       //for each movie search
      
        // const promisedata = gptMovies.map(movie=> searchMovieTMDB(movie))

      //  const tmdbResults = await Promise.all(promisedata);


       
      //  dispatch(addGptMovieResult({movieNames:gptMovies,movieResults:tmdbResults}))
  };
  
    return (
    <div className="pt-[50%] md:pt-[8%] flex justify-center">
      <form className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e)=>e.preventDefault()}
      >
        <input
        ref={searchText}
          type="text"
          className=" p-2 m-2 md:p-4 md:m-4 col-span-9 outline-none"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button className="py-2 m-4 px-4 text-sm md:text-lg bg-red-700 text-white rounded-lg cursor-pointer col-span-3"
        onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;

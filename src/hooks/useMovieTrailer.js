import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { useEffect } from "react";
import { addTrailerVideo } from "../utils/moviesSlice";


const useMovieTrailer=(movieId)=>{
    const dispatch= useDispatch();

    const trailerVideo= useSelector(store=>store.movies.trailerVideo)

    const getMovieVideos = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );
      const json = await data.json();
      
  
      const filteredData = json.results.filter(
        (video) => video.type === "Trailer"
      );
      const trailer = filteredData.lenghth ? filteredData[0] : json.results[0];

      dispatch(addTrailerVideo(trailer));
    };
    useEffect(() => {
      if(!trailerVideo) getMovieVideos();
    }, []);
}

export default useMovieTrailer;
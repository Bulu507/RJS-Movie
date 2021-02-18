import React from 'react';
import { useHistory } from "react-router-dom";

const MovieList = ({rating, img, title, id}) => {
    const history = useHistory();
    const fixRate = rating.toFixed(1);
    const handleOnClick = () => {
        history.push(`/movie/${id}`);
    }

    return(
        <div className='relative rounded shadow-md w-36 m-5 overflow-hidden transition transform hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:transform-none'
         onClick={handleOnClick}>
            <div className='absolute rounded top-0 items-stretch right-0 bg-gray-400 text-yellow-400 m-2 w-7 bg-opacity-50'>
                <p className='font-bold text-center'>{fixRate}</p>
            </div>
            <img src={img} alt='Movie' className='w-full'></img>
            <div className='absolute inset-x-0 bottom-0 bg-gray-400 p-3 bg-opacity-75'>
                <p className='text-center text-xs text-white'>{title}</p>
            </div>
        </div>
    )
}

export default MovieList;
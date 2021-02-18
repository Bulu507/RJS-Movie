import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import API from '../../Services';

const initialData={
    poster: '',
    year: ''
}

const Movie = () =>{
    const params = useParams();
    const [movie, setMovie] = useState({});
    const [addtionalData, setAddtionalData] = useState(initialData);
    const [isLoading, setLoading] = useState(false);
    
    const getMovie = async (movieId) => {
        setLoading(true);
        try {
            const fetchMovie = await API.getMovie(movieId);
            setMovie(fetchMovie);
            const poster = API.getImage(fetchMovie.poster_path);
            const date = new Date(fetchMovie.release_date);
            const year = date.getFullYear();
            setAddtionalData(() => {
                return({
                    ...addtionalData,
                    poster: poster,
                    year: year
                })
            });
        } catch (error) {
            console.log('error');
        }
        setLoading(false);
    }
    
    useEffect(() => {
        if(params.id !== 0){
            getMovie(params.id);
        }
    },[params.id]);
   
    return(
        <>
            {isLoading && 
                <div className='flex animate-pulse pt-10 justify-center text-xl'>
                    Loading...
                </div>
            }
            <div className={(isLoading ? 'hidden' : 'block') + ' py-10 px-32 flex space-x-36'}>
                <img src={addtionalData.poster} alt='Movie' className='w-72 ring-4 ring-gray-600 shadow-md'></img>
                <div>
                    <h1 className='text-4xl font-bold'>{movie.title}</h1>
                    <p className='text-2xl font-bold pt-10'>{addtionalData.year}</p>
                    <div className='flex space-x-1 font-bold text-xl pt-0.5'>
                        {movie.genres && movie.genres.map((item, i) => {
                                return (
                                    i === 0 ? <p key={i}>{item.name}</p> : <p key={i}>, {item.name}</p>
                                )
                            })
                        }
                    </div>
                    <h3 className='pt-5 text-lg font-bold'>Overview</h3>
                    <p>{movie.overview}</p>
                    <div className='pt-5'>
                        <div className='flex space-x-2'>
                            <div>Release:</div>
                            <div>{movie.release_date}</div>
                        </div>
                        <div className='flex space-x-2'>
                            <div>Duration:</div>
                            <div>{movie.runtime} min</div>
                        </div>
                        <div className='flex space-x-2'>
                            <div>Score:</div>
                            <div>{movie.vote_average}</div>
                        </div>
                        <div className='flex space-x-2'>
                            <div>Vote Count:</div>
                            <div>{movie.vote_count}</div>
                        </div>
                        <div className='flex space-x-2'>
                            <div>Popularity:</div>
                            <div>{movie.popularity}</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div>

            </div> */}
        </>
    )
}

export default Movie;
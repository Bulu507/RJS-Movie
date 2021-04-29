import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import API from '../../Services';
import ReviewList from '../../Components/ReviewList';

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
            <div className={(isLoading ? 'hidden' : 'block') + ' py-10 px-32 space-y-14'}>
                <div className='flex space-x-36'>
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
                            <div className='flex space-x-1'>
                                <div>Score:</div>
                                <div>{movie.vote_average}</div>
                                <svg className='flex w-4 items-center' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
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
                <div className=''>
                    <ReviewList id={params.id} />
                </div>
            </div>
        </>
    )
}

export default Movie;
import React, {useState, useEffect} from 'react';
import MovieList from '../../Components/MovieList/MovieList';
import API from '../../Services';

const Home = () =>{
    const [movies, setMovies] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [params, setParams] = useState('upcoming');
    const [isError, setError] = useState(true);

    const getMovies = async (value) => {
        setLoading(true);
        try {
            const fetchData = await API.getMovies(value);
            setMovies(fetchData.results);
        } catch (error) {
            setError(true);
        }
        setLoading(false);
    
    }
    
    useEffect(() => {
        getMovies(params);
    }, [params]);

    return (
        <>
            <div className='flex flex-row justify-start pt-5 px-10 items-end space-x-5'>
                <h1 className='text-2xl'>Most Popular</h1>
                <a href='/movie'>All</a>
                <p onClick={() => setParams('popular')} className='cursor-pointer'>Most Popular</p>
                <a href='/movie'>Recomended</a>
            </div>
            {isLoading && 
                <div className='animate-pulse h-screen text-center pt-10 text-xl'>
                    Loading...
                </div>
            }
            <div className='flex flex-wrap justify-center'>
                {
                    movies.map((movie) => {
                        return (
                            <MovieList 
                                key={movie.id} 
                                img={API.getImage(movie.poster_path)} 
                                title={movie.title} 
                                rating={movie.vote_average} 
                                id={movie.id}
                            />
                        )
                    })
                }
            </div>
        </>
    )
}

export default Home;
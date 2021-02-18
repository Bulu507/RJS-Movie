import React, {useState, useEffect} from 'react';
import API from '../../Services';
import { useHistory } from "react-router-dom";

const initialSearch = {
    query: ''
}

const SearchInput = () => {
    const [isShow, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState(initialSearch);
    const [searchData, setSearchData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const history = useHistory();

    const fetchSearch = async (searchValue) => {
        setLoading(true);
        const data = await API.searchMovie(searchValue);
        setSearchData(data.results);
        setLoading(false);
        console.log(data);
    }

    useEffect(() => {
        if (searchValue.query && searchValue.query.length > 1){
            fetchSearch(searchValue);
        }
    },[searchValue]);

    const handleOnChange = (e) => {
        const val = e.target.value;
        setSearchValue({
            ...initialSearch,
            query: val
        });
        val.length > 1 ? setShow(true) : setShow(false);
    }

    const handleMovieClick = (e) => {
        setSearchValue({
            ...initialSearch,
            query: ''
        });
        setShow(false);
        history.push(`/movie/${e.target.value}`);
    }

    return(
        <div>
            <input 
                className='w-80 p-2 items-center rounded text-gray-700 transition duration-700 ease-in-out'
                type="text" 
                placeholder="Search..."
                value={searchValue.query}
                onChange={handleOnChange} 
            />
            <div className={(isShow ? 'block ' + (isLoading ? 'animate-pulse' : 'animate-none') : 'hidden animate-none') +
            ' block absolute z-50 bg-white text-gray-700 p-2 w-80 list-none text-left rounded shadow-lg mt-2'}>
                <ul>
                    {isLoading ? (  <div>Loading...</div>) :
                        ( searchData.length === 0 ? <div>Not Found...</div> :
                            searchData.map((item) => {
                                return (
                                    <li key={item.id} onClick={handleMovieClick} value={item.id} className='cursor-pointer hover:bg-gray-200'>{item.title}</li>
                                )
                            })
                        )
                    }
                </ul>
            </div>
        </div>
    )
} 

export default SearchInput;
import React from 'react';
import SearchInput from '../SearchInput';
import {Link} from "react-router-dom";

const Header = () =>{
    return(
        <header className='flex justify-between bg-gray-800 py-5 px-8 text-gray-300'>
            <Link to="/">
                <h1 className="font-bold text-3xl items-center pt-1" >MovieKu</h1>
            </Link>
            <SearchInput />
        </header>
    )
}

export default Header;
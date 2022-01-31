import React from 'react';
import { Link } from 'react-router-dom';
import cryptoAvatar from '../images/Icon.jpg';

const Navbar = () => {
    return (
        <div className='w-100 h-40 bg-black text-white'>
            <div>
                <Link to="/" className='flex text-3xl items-center pl-8 font-bold'>Crypto Query
                    <img src={cryptoAvatar} className='w-56 h-full items-center' alt="icon" />
                </Link>
            </div>
        </div>
    );
};

export default Navbar;

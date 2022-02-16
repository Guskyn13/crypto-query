import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ user }) => {
    return (
        <div className='absolute bg-black h-screen'>
            <ul className="flex flex-col items-center gap-6 text-2xl w-64 pt-6 space-y-8">
                <li><Link to="/cryptocurrencies" className='text-white'>Cryptocurrencies</Link></li>
                <li><Link to="/exchanges" className='text-white'>Exchanges</Link></li>
                <li><Link to="/miningcrypto" className='text-white'>Mining</Link></li>
                <li><Link to="/news" className='text-white'>News</Link></li>
                <li><Link to="/profile" className='text-white'>Profile</Link></li>
            </ul>

            <div className='flex relative h-80 w-full justify-center items-center'>
                <div className='flex justify-center items-center absolute bottom-0 space-x-4'>
                    <img className='h-12 ' src={user?.image} />
                    <p className='text-white'>{user?.userName}</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

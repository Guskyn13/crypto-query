import React, { useState } from 'react';
import cryptoAvatar from '../images/Icon.jpg';
import Sidebar from '../components/Sidebar';

const Navbar = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <>
            <div className='h-35 bg-black text-white w-100'>
                <div className='flex justify-between'>
                    <a href='/'>
                        <div className='flex items-center pl-8 font-bold
                            2xl:text-3xl 
                            md:text-2xl
                            text-lg'>
                            Crypto Query
                            <img src={cryptoAvatar} className='w-56 h-full items-center invisible lg:visible' alt="icon" />
                        </div>
                    </a>
                    <div className='flex items-center justify-center pr-8 text-5xl'>
                        <button className='xl:hidden' onClick={() => setShowSidebar(!showSidebar)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Navbar;

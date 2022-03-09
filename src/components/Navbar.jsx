import React, { useState, useEffect } from 'react';
import cryptoAvatar from '../images/Icon.jpg';
import Sidebar from '../components/Sidebar';

const Navbar = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <>
            <div className='xl:h-40 bg-black text-white w-100'>
                <div className='flex justify-between h-16'>
                    <a href='/'>
                        <div className='flex w-100 xl:items-center pl-8 font-bold pt-5 md:pt-4
                            2xl:text-3xl 
                            xl:text-2xl
                            text-md'>
                            Crypto Query
                                <img src={cryptoAvatar} className='w-10 xl:w-56 items-center invisible xl:visible' alt="icon" />
                        </div>
                    </a>
                    <div className='flex items-center justify-center pr-8 text-xl'>
                        <button className='xl:hidden'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                </div>
            </div>
            {/* <Sidebar /> */}
        </>
    );
};

export default Navbar;

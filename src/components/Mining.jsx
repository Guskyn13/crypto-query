import React, { useState, useEffect } from 'react';
import { useGetMineableCoinsQuery } from '../services/mineableCoinsApi';
import { Rings } from '../components';
import millify from 'millify';

const Mining = () => {
    const { data: mineableCoins, isFetching } = useGetMineableCoinsQuery();
    const [filteredCryptos, setFilteredCryptos] = useState(mineableCoins);
    const [searchCrypto, setSearchCrypto] = useState('');

    useEffect(() => {
        setFilteredCryptos(mineableCoins)
        const filteredCoins = mineableCoins?.filter((coin) => coin.name.toLowerCase().includes(searchCrypto.toLowerCase()))
        setFilteredCryptos(filteredCoins)
    }, [searchCrypto, mineableCoins])

    if (isFetching) return <Rings />;

    return (
        <div>
            <div className='flex items-center justify-center lg:text-2xl text-md pt-10 sm:text-lg xl:pl-56'>
                <input type="text" placeholder='Search Mineable Cryptocurrency' className='h-8 pl-4 bg-gray-500 w-4/5 sm:h-10 xl:w-2/3' onChange={(e) => setSearchCrypto(e.target.value)}></input>
            </div>

            <div className='w-full flex justify-center pb-8 h-full'>
                <div className='flex justify-center text-black xl:pl-60 pr-10 pt-10 w-100'>
                    <div className='grid pl-10 gap-8 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2'>
                        {filteredCryptos?.map((mineableCoin) => (
                            <div key={mineableCoin?.id} className='border-2 border-black flex flex-col items-center bg-gray-500'>
                                <span className='pt-3 pb-3 font-bold xl:text-2xl text-2xl'>{mineableCoin?.coin}</span>
                                <div className='flex flex-col items-center text-xl pb-4'>

                                    <span><span className='font-bold'>Name</span>: {mineableCoin?.name}</span>
                                    <span><span className='font-bold'>Algorithm</span>: {mineableCoin?.algorithm}</span>
                                    <span><span className='font-bold'>Difficulty</span>: {mineableCoin?.difficulty}</span>
                                    <span><span className='font-bold'>Current Price</span>: ${millify(mineableCoin?.price)}</span>
                                    <span><span className='font-bold'>Reward</span>: {mineableCoin?.reward}</span>
                                    <span><span className='font-bold'>Type</span>: {mineableCoin?.type}</span>
                                    <span><span className='font-bold'>Volume</span>: ${millify(mineableCoin?.volume)}</span>
                                    <span><span className='font-bold'>Reward Unit</span>: {mineableCoin?.reward_unit}</span>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mining;
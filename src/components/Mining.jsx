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
            <div className='flex justify-center pl-64 pt-10 text-2xl'>
                <input type="text" placeholder='Search Mineable Cryptocurrency' className='h-12 pl-4 bg-gray-500 w-3/5' onChange={(e) => setSearchCrypto(e.target.value)}></input>
            </div>
            <div className='w-full flex justify-center'>
                <div className='flex justify-center text-black pl-64 pt-10 text-5xl w-100'>
                    <div className='grid lg:grid-cols-5 pl-10 gap-5 md:grid-cols-3'>
                        {filteredCryptos?.map((mineableCoin) => (
                            <div key={mineableCoin.id} className='border-4 border-black flex flex-col items-center bg-gray-500 pb-4 pl-4 pr-4 space-y-1' >
                                <p className='text-4xl font-bold pt-4 pb-4'>{mineableCoin.coin}</p>
                                <p className='text-2xl'><strong>Name</strong>: {mineableCoin.name}</p>
                                <p className='text-2xl'><strong>Algorithm</strong>: {mineableCoin?.algorithm}</p>
                                <p className='text-2xl'><strong>Difficulty</strong>: {mineableCoin?.difficulty}</p>
                                <p className='text-2xl'><strong>Current Price</strong>: ${millify(mineableCoin.price)}</p>
                                <p className='text-2xl'><strong>Reward</strong>: {mineableCoin.reward}</p>
                                <p className='text-2xl'><strong>Type</strong>: {mineableCoin.type}</p>
                                <p className='text-2xl'><strong>Volume</strong>: ${millify(mineableCoin.volume)}</p>
                                <p className='text-2xl'><strong>Reward Unit</strong>: {mineableCoin.reward_unit}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mining;
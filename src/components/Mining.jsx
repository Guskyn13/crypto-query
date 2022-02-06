import React from 'react';
import { useGetMineableCoinsQuery } from '../services/mineableCoinsApi';
import { Rings } from '../components';
import millify from 'millify';

const Mining = () => {
    const { data: mineableCoins, isFetching } = useGetMineableCoinsQuery();

    if (isFetching) return <Rings />;

    console.log(mineableCoins);

    return (
        <div className='w-full flex justify-center'>
            <div className='flex justify-center text-black pl-64 pt-10 text-5xl w-100'>
                <div className='grid lg:grid-cols-5 pl-10 gap-5 md:grid-cols-3'>
                    {mineableCoins?.map((mineableCoin) => (
                        <div key={mineableCoin.id} className='border-4 border-black flex flex-col items-center bg-purple-400 pb-4' >
                            <p className='text-4xl font-bold pt-3 pb-3'>{mineableCoin.coin}</p>
                            <p className='text-2xl'><strong>Name:</strong> {mineableCoin.name}</p>
                            <p className='text-2xl'><strong>Algorithm:</strong> {mineableCoin?.algorithm}</p>
                            <p className='text-2xl'><strong>Difficulty:</strong> {mineableCoin?.difficulty}</p>
                            <p className='text-2xl'><strong></strong>Current Price: ${millify(mineableCoin.price)}</p>
                            <p className='text-2xl'><strong></strong>Reward: {mineableCoin.reward}</p>
                            <p className='text-2xl'><strong></strong>Type: {mineableCoin.type}</p>
                            <p className='text-2xl'><strong></strong>Volume: ${millify(mineableCoin.volume)}</p>
                            <p className='text-2xl'><strong></strong>Reward Unit: {mineableCoin.reward_unit}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Mining;
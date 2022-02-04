import React from 'react';
import { useGetExchangesQuery } from '../services/cryptoCoinsApi';
import { Rings } from '../components';

const Exchanges = ({ shortened }) => {
    const count = shortened ? 5 : 100;
    const { data: coinExchanges, isFetching } = useGetExchangesQuery(count);

    if (isFetching) return <Rings />;

    return (
        <>
            {!shortened && (
                <div className='flex items-center justify-center text-2xl pt-10'>
                    <input placeholder='Search Exchange' className='h-12 pl-4' />
                </div>
            )}
            <div className='w-full flex justify-center pb-8'>
                <div className='flex justify-center text-black pl-64 pt-10 text-5xl w-100'>
                    <div className='grid lg:grid-cols-5 pl-10 gap-5 sm:grid-cols-3 md:grid-cols-3'>
                        {coinExchanges?.map((exchange) => (
                            <div key={exchange.id} className='border-4 border-black flex flex-col items-center bg-purple-400'>
                                <h2 className='text-4xl pt-3 pb-3'>{exchange.name}</h2>
                                <a href={exchange.url}><img className="h-20" key={exchange.name} alt="exchange icon" src={exchange.image} /></a>
                                <p className='text-2xl pt-2'>{exchange.trust_score_rank}</p>
                                <p className='text-2xl pt-2'>{exchange.country}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Exchanges;

import React, { useState, useEffect } from 'react';
import { useGetExchangesQuery } from '../services/cryptoCoinsApi';
import { Rings } from '../components';

const Exchanges = ({ shortened }) => {
    const count = shortened ? 5 : 100;
    const { data: coinExchanges, isFetching } = useGetExchangesQuery(count);
    const [filteredExchange, setFilteredExchange] = useState(coinExchanges);
    const [searchExchange, setSearchExchange] = useState('');

    useEffect(() => {
        setFilteredExchange(coinExchanges)
        const filterExchange = coinExchanges?.filter((exchange) => exchange.name.toLowerCase().includes(searchExchange.toLowerCase()))
        setFilteredExchange(filterExchange)
    }, [searchExchange, coinExchanges])

    if (isFetching) return <Rings />;
    
    return (
        <>
            {!shortened && (
                <div className='flex items-center justify-center text-2xl pt-10'>
                    <input type="text" placeholder='Search Exchange' className='h-12 pl-4' onChange={(e) => setSearchExchange(e.target.value)} />
                </div>
            )}
            <div className='w-full flex justify-center pb-8'>
                <div className='flex justify-center text-black pl-64 pt-10 text-5xl w-100'>
                    <div className='grid lg:grid-cols-5 pl-10 gap-5 sm:grid-cols-3 md:grid-cols-3'>
                        {filteredExchange?.map((exchange) => (
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

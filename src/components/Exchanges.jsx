import React, { useState, useEffect } from 'react';
import { useGetExchangesQuery } from '../services/cryptoCoinsApi';
import { Rings } from '../components';
import millify from 'millify';

const Exchanges = ({ shortened }) => {
    const count = shortened ? 6 : 100;
    const { data: coinExchanges, isFetching } = useGetExchangesQuery(count);
    const [filteredExchange, setFilteredExchange] = useState(coinExchanges);
    const [searchExchange, setSearchExchange] = useState('');

    console.log(coinExchanges);

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
                    <input type="text" placeholder='Search Exchange' className='h-12 pl-4 bg-gray-500 w-3/5' onChange={(e) => setSearchExchange(e.target.value)} />
                </div>
            )}
            <div className='w-full flex justify-center pb-8'>
                <div className='flex justify-center text-black pl-64 pt-10 text-5xl w-100'>
                    <div className='grid lg:grid-cols-6 pl-10 gap-8 sm:grid-cols-3 md:grid-cols-3'>
                        {filteredExchange?.map((exchange) => (
                            <div key={exchange.id} className='border-4 border-black flex flex-col items-center bg-gray-500'>
                                <p className='text-3xl pt-3 pb-3 font-bold pr-2 pl-2'>{exchange.name}</p>
                                <a href={exchange.url}><img className="h-20" key={exchange.name} alt="exchange icon" src={exchange.image} /></a>
                                <p className='text-2xl pt-2 text-white'>{exchange.trust_score_rank}</p>
                                <p className='text-2xl text-white'>{exchange.country}</p>
                                <p className='flex text-2xl space-x-2'>
                                    <strong>24H Trade Volume</strong>:
                                    <p className='text-white pb-4'>{millify(exchange.trade_volume_24h_btc)}
                                    </p>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Exchanges;

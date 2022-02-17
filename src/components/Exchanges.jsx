import React, { useState, useEffect } from 'react';
import { useGetExchangesQuery } from '../services/cryptoCoinsApi';
import { Rings } from '../components';
import millify from 'millify';

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
        <div className='bg-gray-700 h-full'>
            {!shortened && (
                <div className='flex items-center justify-center lg:text-2xl text-md pt-10 sm:text-lg xl:pl-56'>
                    <input type="text" placeholder='Search Exchange' className='h-8 pl-4 bg-gray-500 w-4/5 sm:h-10 xl:w-2/3' onChange={(e) => setSearchExchange(e.target.value)} />
                </div>
            )}
            <div className='w-full flex justify-center pb-8 h-full'>
                <div className='flex justify-center text-black xl:pl-60 pr-10 pt-10 w-100'>
                    <div className='grid pl-10 gap-8 
                        2xl:grid-cols-5
                        lg:grid-cols-4
                        md:grid-cols-3
                        sm:grid-cols-2
                        '>
                        {filteredExchange?.map((exchange) => (
                            <div key={exchange.id} className='2xl:border-4 border-2 border-black flex flex-col items-center bg-gray-500'>

                                <p className='pt-3 pb-3 font-bold xl:text-2xl text-xl'>{exchange.name}</p>
                                <a href={exchange.url}><img className="h-20" key={exchange.name} alt="exchange icon" src={exchange.image} /></a>
                                <p className='pt-2 font-bold xl:text-2xl text-xl'>{exchange.trust_score_rank}</p>

                                <p className='text-xl text-white'>{exchange.country}</p>

                                <p className='flex space-x-2 pl-2 pr-2 pt-2'>
                                    <strong>24H Trade Volume</strong>:
                                    <p className='text-white pb-4'>${millify(exchange.trade_volume_24h_btc)}
                                    </p>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Exchanges;

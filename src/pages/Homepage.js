import React from 'react';
import { useGetGlobalCryptoStatsQuery } from '../services/cryptoApi';
import { Link } from 'react-router-dom';
import millify from 'millify';
import { Cryptocurrencies, Exchanges, Rings, News } from '../components';

const Homepage = () => {
    const { data: globalCoinStats, isFetching } = useGetGlobalCryptoStatsQuery();
    if (isFetching) return <Rings />;
    const globalStats = globalCoinStats?.data.stats;

    return (
        <>
            <div className='w-full bg-gray-700'>
                <div className='text-black flex flex-col items-center pt-10 w-100 border-4 border-black'>
                    <p className='text-4xl font-bold pb-4 border-b-2 border-black'>Global Crypto Stats</p>
                    <div className='flex justify-center w-full pt-8 pb-8 space-x-5'>
                        <p
                            className='flex text-3xl font-bold'>
                            Total Cryptocurrencies
                            <p className='text-white pl-3'>{millify(globalStats?.totalCoins)}</p>
                        </p>
                        <p
                            className='flex text-3xl font-bold'>
                            Total Exchanges
                            <p className='text-white pl-3'>{millify(globalStats?.totalExchanges)}</p>
                        </p>
                        <p
                            className='flex text-3xl font-bold'>
                            Total Market Cap
                            <p className='text-white pl-3'>{millify(globalStats?.totalMarketCap)}</p>
                        </p>
                        <p
                            className='flex text-3xl font-bold'>
                            Total 24h Volume
                            <p className='text-white pl-3'>{millify(globalStats?.total24hVolume)}</p>
                        </p>
                        <p
                            className='flex text-3xl font-bold'>
                            Total Markets
                            <p className='text-white pl-3'>{millify(globalStats?.totalMarkets)}</p>
                        </p>
                    </div>
                </div>

                <div className='flex justify-between pt-10 text-black text-4xl font-bold'>
                    <p className='pl-72'>Top 12 Cryptocurrencies</p>
                    <Link to="/cryptocurrencies" className='pr-8 text-2xl text-white'>Show More</Link>
                </div>

                <Cryptocurrencies shortened />

                <div className='flex justify-between pt-10 text-black text-4xl font-bold'>
                    <p className='pl-72'>Top 6 Exchanges</p>
                    <Link to="/exchanges" className='pr-8 text-2xl text-white'>Show More</Link>
                </div>

                <Exchanges shortened />

                <div className='flex justify-between pt-10 text-black text-4xl font-bold'>
                    <p className='pl-72'>Top Crypto News</p>
                    <Link to="/news" className='pr-8 text-2xl text-white'>Show More</Link>
                </div>

                <News shortened />

            </div>


        </>
    );
};

export default Homepage;

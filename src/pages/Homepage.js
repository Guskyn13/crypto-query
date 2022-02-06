import React from 'react';
import { useGetGlobalCryptoStatsQuery } from '../services/cryptoApi';
import { Link } from 'react-router-dom';
import millify from 'millify';
import { Cryptocurrencies, Exchanges, Rings, News, Mining } from '../components';

const Homepage = () => {
    const { data: globalCoinStats, isFetching } = useGetGlobalCryptoStatsQuery();
    if (isFetching) return <Rings />;
    const globalStats = globalCoinStats?.data.stats;

    return (
        <div className='w-full bg-gray-700'>
            <div className='text-black flex flex-col items-center pt-10 w-100'>
                <p className='text-4xl font-bold pb-4 border-b-2 border-black'>Global Crypto Stats</p>
                <p className='text-2xl pb-1 font-bold pt-4'>Total Cryptocurrencies</p>
                <p className='text-2xl pb-3'>{millify(globalStats?.totalCoins)}</p>
                <p className='text-2xl pb-1 font-bold'>Total Exchanges</p>
                <p className='text-2xl pb-3'>{millify(globalStats?.totalExchanges)}</p>
                <p className='text-2xl pb-1 font-bold'>Total Market Cap</p>
                <p className='text-2xl pb-3'>{millify(globalStats?.totalMarketCap)}</p>
                <p className='text-2xl pb-1 font-bold'>Total 24h Volume</p>
                <p className='text-2xl pb-3'>{millify(globalStats?.total24hVolume)}</p>
                <p className='text-2xl font-bold'>Total Markets</p>
                <p className='text-2xl pb-3'>{millify(globalStats?.totalMarkets)}</p>
            </div>

            <div className='flex justify-between pt-10 text-black text-4xl font-bold'>
                <p className='pl-72'>Top 10 Cryptocurrencies</p>
                <Link to="/cryptocurrencies" className='pr-8 text-2xl text-green-700'>Show More</Link>
            </div>

            <Cryptocurrencies shortened />

            <div className='flex justify-between pt-10 text-black text-4xl font-bold'>
                <p className='pl-72'>Top 10 Exchanges</p>
                <Link to="/exchanges" className='pr-8 text-2xl text-green-700'>Show More</Link>
            </div>

            <Exchanges shortened />

            <div className='flex justify-between pt-10 text-black text-4xl font-bold'>
                <p className='pl-72'>Top Mineable Coins</p>
                <Link to="/miningcrypto" className='pr-8 text-2xl text-green-700'>Show More</Link>
            </div>

            <Mining />

            <div className='flex justify-between pt-10 text-black text-4xl font-bold'>
                <p className='pl-72'>Top Crypto News</p>
                <Link to="/news" className='pr-8 text-2xl text-green-700'>Show More</Link>
            </div>

            <News shortened />

        </div>
    );
};

export default Homepage;

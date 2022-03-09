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
                <div className='text-black flex flex-col items-center pt-10 w-100 border-b-4 border-black'>
                    <p className='
                        font-bold pb-2 border-b-2 border-black 
                        lg:text-4xl
                        md:text-2xl 
                        text-xl'
                        >
                            Global Crypto Stats</p>
                    <div className='
                        flex justify-center w-full pt-8 pb-8 space-x-5 flex-col items-center
                        2xl:justify-center 2xl:flex-row 2xl:pl-28
                        '>
                        <p
                            className='
                                flex font-bold
                                2xl:text-lg 
                                lg:text-2xl 
                                md:text-xl
                                text-lg'>
                            Total Cryptocurrencies
                            <p className='text-white pl-3'>{millify(globalStats?.totalCoins)}</p>
                        </p>
                        <p
                            className='
                            flex font-bold
                            2xl:text-lg 
                            lg:text-2xl 
                            md:text-xl
                            text-lg'>
                            Total Exchanges
                            <p className='text-white pl-3'>{millify(globalStats?.totalExchanges)}</p>
                        </p>
                        <p
                            className='
                            flex font-bold
                            2xl:text-lg 
                            lg:text-2xl 
                            md:text-xl
                            text-lg'>
                            Total Market Cap
                            <p className='text-white pl-3'>{millify(globalStats?.totalMarketCap)}</p>
                        </p>
                        <p
                            className='
                            flex font-bold
                            2xl:text-lg 
                            lg:text-2xl 
                            md:text-xl
                            text-lg'>
                            Total 24h Volume
                            <p className='text-white pl-3'>{millify(globalStats?.total24hVolume)}</p>
                        </p>
                        <p
                            className='
                            flex font-bold
                            2xl:text-lg 
                            lg:text-2xl 
                            md:text-xl
                            text-lg'>
                            Total Markets
                            <p className='text-white pl-3'>{millify(globalStats?.totalMarkets)}</p>
                        </p>
                    </div>
                </div>

                <div className='flex justify-between pt-10 text-black font-bold text-lg md:text-xl lg:text-2xl 2xl:text-3xl'>
                    <p className='xl:pl-72 md:pl-8 pl-4'>Top 10 Cryptocurrencies</p>
                    <Link to="/cryptocurrencies" className='pr-4 text-white lg:pr-12'>Show More</Link>
                </div>

                <Cryptocurrencies shortened />

                <div className='flex justify-between pt-10 text-black font-bold text-lg md:text-xl lg:text-2xl 2xl:text-3xl'>
                    <p className='xl:pl-72 md:pl-8 pl-4'>Top 5 Exchanges</p>
                    <Link to="/exchanges" className='pr-4 text-white lg:pr-12'>Show More</Link>
                </div>

                <Exchanges shortened />

                <div className='flex justify-between pt-10 text-black font-bold text-lg md:text-xl lg:text-2xl 2xl:text-3xl'>
                    <p className='xl:pl-72 md:pl-8 pl-4'>Top Crypto News</p>
                    <Link to="/news" className='pr-4 text-white lg:pr-12'>Show More</Link>
                </div>

                <News shortened />

            </div>


        </>
    );
};

export default Homepage;

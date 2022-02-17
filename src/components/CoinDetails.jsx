import React, { useState } from 'react';
import millify from 'millify';
import { useParams } from 'react-router-dom';
import { useGetCoinsDetailQuery, useGetCryptoHistoryQuery } from '../services/cryptoCoinsApi';
import { Rings, LineChart } from '../components';
import HTMLReactParser from 'html-react-parser';

const CoinDetails = () => {
    const [timePeriod, setTimePeriod] = useState('7');
    const { coinId } = useParams();
    const { data: coinDetails, isFetching } = useGetCoinsDetailQuery(coinId);
    const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });

    if (isFetching) return <Rings />;

    const time = [1, 3, 7, 10, 14, 20, 28, 30];

    const marketData = coinDetails?.market_data;

    const coinHomepage = coinDetails?.links?.homepage;
    const coinBlockchain = coinDetails?.links?.blockchain_site;
    const coinForum = coinDetails?.links?.official_forum_url;
    // const links = coinDetails?.links;


    return (
        <div>
            <div className='w-full flex flex-col justify-center items-center pb-8 xl:pl-56'>
                <div className='flex flex-col  items-center pt-6 mb-20'>
                    <h1 className='font-bold pb-6 
                        text-4xl
                        xl:text-5xl
                        '>{coinDetails?.name} ({coinDetails?.symbol})</h1>
                    <img src={coinDetails?.image?.thumb} className='h-24' alt="coin thumbnail" />
                </div>

                <div className='flex space-x-2 justify-center items-center'>
                    <select defaultValue="7" onChange={(e) => setTimePeriod(e.target.value)} className='w-16 h-6'>
                        {time?.map((date) => <option key={date}>{date}</option>)}
                    </select>
                    <p className='text-white text-xl'>Days Ago</p>
                </div>

                <LineChart coinHistory={coinHistory} currentPrice={millify(marketData?.current_price?.usd)} coinName={coinDetails?.name} />

                <div className='w-4/5 text-base text-white lg:text-xl'>
                    <p>{HTMLReactParser(coinDetails?.description?.en)}</p>
                </div>

                <div className='grid grid-cols-3 pt-16 pl-2'>

                    <div className='text-base text-white space-y-48 font-bold lg:text-xl'>
                        <p>{coinDetails?.name} <br /> Price Statistics</p>
                        <p>{coinDetails?.name} <br /> Market Statistics</p>
                    </div>

                    <div className='text-base space-y-4 text-gray-500 pl-4 lg:text-xl lg:font-bold'>
                        <p>Coin Rank:</p>
                        <p>Current Price:</p>
                        <p>Highest in past 24h:</p>
                        <p>Lowest in past 24h:</p>
                        <p>Price change in 24h:</p>
                        <p className='pt-12'>Circulating Supply:</p>
                        <p>Total Supply:</p>
                        <p>Market Cap:</p>
                        <p>24h Mkt cap chg:</p>
                        <p>Total volume:</p>
                    </div>

                    <div className='text-base space-y-4 pl-8 lg:text-xl lg:font-bold'>
                        <p>{coinDetails?.market_cap_rank}</p>
                        <p>${millify(marketData?.current_price?.usd)}</p>
                        <p>${millify(coinDetails?.market_data?.high_24h?.usd)}</p>
                        <p>${millify(coinDetails?.market_data?.low_24h?.usd)}</p>
                        <p>${millify(marketData?.price_change_24h)}</p>
                        <p className='pt-12'>${millify(marketData?.circulating_supply)}</p>
                        <p>${millify(marketData?.total_supply)}</p>
                        <p>${millify(marketData?.market_cap?.usd)}</p>
                        <p>${millify(marketData?.market_cap_change_24h)}</p>
                        <p>${millify(marketData?.total_volume?.usd)}</p>
                    </div>
                </div>

                <p className='text-xl lg:text-3xl font-bold pb-4 mt-16 text-blue-600'>Links</p>

                <div className='flex justify-evenly items-center w-full pb-4'>

                    <a href={(coinHomepage[0]) ? (coinHomepage[0]) : ""}>
                        <button className='p-4 bg-black text-white rounded-2xl'>
                            {coinDetails?.name}<br /> Homepage
                        </button>
                    </a>
                    <a href={(coinBlockchain[0]) ? (coinBlockchain[0]) : ""}>
                        <button className='p-4 bg-black text-white rounded-2xl'>
                            {coinDetails?.name} <br /> Blockchain
                        </button>
                    </a>
                    <a href={(coinForum[0]) ? (coinForum[0]) : ""}>
                        <button className='p-4 bg-black text-white rounded-2xl'>
                            {coinDetails?.name}<br/> Forum
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CoinDetails;

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

    return (
        <div>
            <div className='w-full flex flex-col justify-center items-center pb-8'>
                <div className='flex flex-col  items-center pt-10'>
                    <h1 className='text-6xl font-bold pb-8'>{coinDetails?.name} ({coinDetails?.symbol})</h1>
                    <img src={coinDetails?.image?.thumb} className='h-20 mb-20' alt="coin thumbnail" />
                </div>

                <div className='flex space-x-2'>
                    <select defaultValue="7" placeholder='Select a Timeperiod' onChange={(e) => setTimePeriod(e.target.value)} className='w-20'>
                        {time?.map((date) => <option key={date}>{date}</option>)}
                    </select>
                    <p className='text-white text-2xl'>Days Ago</p>
                </div>

                <LineChart coinHistory={coinHistory} currentPrice={millify(marketData?.current_price?.usd)} coinName={coinDetails?.name} />

                <div className='w-4/5 pl-32 text-2xl text-white'>
                    <p>{HTMLReactParser(coinDetails?.description?.en)}</p>
                </div>

                <div className='grid grid-cols-3 pt-28 font-bold pl-32'>

                    <div className='pr-20 text-4xl text-white space-y-72'>
                        <p>{coinDetails?.name} Price Statistics</p>
                        <p>{coinDetails?.name} Market Statistics</p>
                    </div>

                    <div className='text-2xl space-y-6 pt-2 text-gray-500'>
                        <p>Coin Rank:</p>
                        <p>Current Price:</p>
                        <p>Highest in past 24h:</p>
                        <p>Lowest in past 24h:</p>
                        <p>Price change in 24h:</p>
                        <p className='pt-12'>Circulating Supply:</p>
                        <p>Total Supply:</p>
                        <p>Market Cap:</p>
                        <p>24h Market cap change:</p>
                        <p>Total volume:</p>
                    </div>

                    <div className='text-2xl space-y-6 pt-2'>
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
            </div>
        </div>
    );
};

export default CoinDetails;

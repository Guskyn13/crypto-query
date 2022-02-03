import React, { useState } from 'react';
import millify from 'millify';
import { useParams } from 'react-router-dom';
import { useGetCoinsDetailQuery, useGetCryptoHistoryQuery } from '../services/cryptoCoinsApi';
import { Rings, LineChart } from '../components';

const CoinDetails = () => {
    const [timePeriod, setTimePeriod] = useState('7d');
    const { coinId } = useParams();
    const { data: coinDetails, isFetching } = useGetCoinsDetailQuery(coinId);
    const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });

    if (isFetching) return <Rings />;

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const marketData = coinDetails?.market_data;

    return (
        <>
            <div className='w-full flex flex-col justify-center items-center pb-8'>
                <div className='pt-10'>
                    <h1 className='text-3xl font-bold'>{coinDetails.name} ({coinDetails.symbol})</h1>
                </div>

                <p className='text-xl pb-4'>{marketData.market_cap_rank}</p>
                <img src={coinDetails.image.thumb} className='h-20 mb-4' alt="coin thumbnail" />

                <select defaultValue="7d" placeholder='Select a Timeperiod' onChange={(value) => setTimePeriod(value)}>
                    {time.map((date) => <option key={date}>{date}</option>)}
                </select>
                <LineChart coinHistory={coinHistory} currentPrice={millify(marketData.current_price.usd)} coinName={coinDetails.name} />
                <div className='border-2 border-black w-1/2 ml-60'>
                    <p>circulating supply: {marketData.circulating_supply}</p>
                    <p>Current Price: ${marketData.current_price.usd}</p>
                    <p>24h Market cap change: {marketData.market_cap_change_24h}</p>
                    <p>Price change in 24h: {marketData.price_change_24h}</p>
                    <p>Total Supply: {marketData.total_supply}</p>
                    <p>Market Cap: {marketData.market_cap.usd}</p>
                    <p>Max Supply: {marketData.max_supply}</p>
                    <p>Total volume: {marketData.total_volume.usd}</p>
                </div>
            </div>
        </>
    );
};

export default CoinDetails;

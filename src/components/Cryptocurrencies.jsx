import React from 'react';
import { Link } from 'react-router-dom';
import millify from 'millify';
import { useGetCryptoCoinsQuery } from '../services/cryptoCoinsApi';
import Rings from '../components/Rings';

const Cryptocurrencies = ({ shortened }) => {
  const count = shortened ? 10 : 250;
  const { data: cryptoCoins, isFetching } = useGetCryptoCoinsQuery(count);

  if (isFetching) return <Rings />

  return (
    <>
    {!shortened && (
      <div className='flex items-center justify-center text-2xl pt-10'>
        <input placeholder='Search Cryptocurrency' className='h-12 pl-4' />
      </div>
    )}
      <div className='w-full flex justify-center pb-8'>
        <div className='flex justify-center text-black pl-60 pr-10 pt-10 w-100'>
          <div className='grid lg:grid-cols-5 pl-10 gap-5 md:grid-cols-3'>
            {cryptoCoins?.map((coinsList) => (
              <div key={coinsList.id} className='border-4 border-black flex flex-col items-center bg-purple-400'>
                <h2 className='text-4xl pt-3 pb-3'>{coinsList.name} ({coinsList.symbol})</h2>
                <Link to={`/coins/${coinsList.id}`}><img src={coinsList.image} alt="crypto-symbol" className="h-20" /></Link>
                <p className='text-2xl pt-2'>{millify(coinsList.market_cap_rank)}</p>
                <p className='text-xl pt-1'><strong>Current Price</strong>: ${millify(coinsList.current_price)}</p>
                <p className='text-xl pt-1 pb-4'><strong>24h % change</strong>: ${millify(coinsList.market_cap_change_percentage_24h)}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cryptocurrencies;

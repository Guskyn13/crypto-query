import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import millify from 'millify';
import { useGetCryptoCoinsQuery } from '../services/cryptoCoinsApi';
import { Rings } from '../components';

const Cryptocurrencies = ({ shortened }) => {
  const count = shortened ? 10 : 250;
  const { data: cryptoCoins, isFetching } = useGetCryptoCoinsQuery(count);
  const [filteredCryptos, setFilteredCryptos] = useState(cryptoCoins);
  const [searchCrypto, setSearchCrypto] = useState('');

  useEffect(() => {
    setFilteredCryptos(cryptoCoins)
    const filteredCoins = cryptoCoins?.filter((coin) => coin.name.toLowerCase().includes(searchCrypto.toLowerCase()))
    setFilteredCryptos(filteredCoins)
  }, [searchCrypto, cryptoCoins])

  if (isFetching) return <Rings />

  return (
    <div className='bg-gray-700 h-full'>
      {!shortened && (
        <div className='flex items-center justify-center lg:text-2xl text-md pt-10 sm:text-lg xl:pl-56'>
          <input type="text" placeholder='Search Cryptocurrency' className='h-8 pl-4 bg-gray-500 w-4/5 sm:h-10 xl:w-2/3' onChange={(e) => setSearchCrypto(e.target.value)} />
        </div>
      )}
      <div className='w-full flex justify-center pb-8 h-full'>
        <div className='flex justify-center text-black xl:pl-60 pr-10 pt-10 w-100'>
          <div className='grid pl-10 gap-8 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2'>
            {filteredCryptos?.map((coinsList) => (
              <div key={coinsList.id} className='2xl:border-4 border-2 border-black flex flex-col items-center bg-gray-500'>

                <p className='pt-3 pb-3 font-bold xl:text-2xl text-xl'>
                  {coinsList.name} ({coinsList.symbol})
                </p>

                <Link to={`/coins/${coinsList.id}`}><img src={coinsList.image} alt="crypto-symbol" className="h-20" /></Link>

                <p className='pt-2 font-bold xl:text-2xl text-xl'>
                  {millify(coinsList.market_cap_rank)}
                </p>

                <div className='flex items-center pt-2 space-x-2 pr-4 pl-4'>
                  <span className='font-bold
                 '
                  >
                    Current Price:
                  </span >
                  <span className='text-white
                  2xl:text-lg
                  '
                  >
                    ${millify(coinsList.current_price)}
                  </span>
                </div>

                <div className='flex items-center pt-2 space-x-2 pb-2 pr-4 pl-4'>
                  <span className='font-bold
                  '
                  >
                    24h % change:
                  </span>
                  <span className='text-white
                  2xl:text-lg
                  '
                  >
                    ${millify(coinsList.market_cap_change_percentage_24h)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  );
};

export default Cryptocurrencies;

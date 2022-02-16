import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import millify from 'millify';
import { useGetCryptoCoinsQuery } from '../services/cryptoCoinsApi';
import { Rings } from '../components';

const Cryptocurrencies = ({ shortened }) => {
  const count = shortened ? 12 : 250;
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
        <div className='flex items-center justify-center text-2xl pt-10'>
          <input type="text" placeholder='Search Cryptocurrency' className='h-12 pl-4 bg-gray-500 w-3/5' onChange={(e) => setSearchCrypto(e.target.value)} />
        </div>
      )}
      <div className='w-full flex justify-center pb-8 h-full'>
        <div className='flex justify-center text-black pl-60 pr-10 pt-10 w-100'>
          <div className='grid lg:grid-cols-6 pl-10 gap-8 md:grid-cols-3'>
            {filteredCryptos?.map((coinsList) => (
              <div key={coinsList.id} className='border-4 border-black flex flex-col items-center bg-gray-500'>
                <p className='text-3xl pt-3 pb-3 font-bold'>{coinsList.name} ({coinsList.symbol})</p>
                <Link to={`/coins/${coinsList.id}`}><img src={coinsList.image} alt="crypto-symbol" className="h-20" /></Link>
                <p className='text-2xl pt-2 font-bold'>{millify(coinsList.market_cap_rank)}</p>

                <div>
                  <p className=' flex space-x-2 text-xl pt-1'>
                    <strong>Current Price</strong>:
                    <h4 className='text-white'>${millify(coinsList.current_price)}
                    </h4>
                  </p>
                </div>

                <div>
                  <p
                    className='flex space-x-2 text-xl pt-1 pb-4'>
                    <strong>24h % change</strong>:
                    <h4 className='text-white'>${millify(coinsList.market_cap_change_percentage_24h)}%
                    </h4>
                  </p>
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

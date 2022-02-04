import React, { useState } from 'react';
import { useGetCryptoNewsQuery } from '../services/cryptoNews';
import { Rings } from '../components';

const News = ({ shortened }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ newsCategory, count: shortened ? 5 : 20 });

    if (isFetching) return <Rings />;

    console.log(cryptoNews);

    return (
        <div className='w-full flex justify-center'>
            <div className='flex justify-center text-black pl-64 pt-10 text-5xl w-100'>
                  <div>
                      {cryptoNews?.value.map((cryptoArticle) => (
                          console.log(cryptoArticle)
                      ))}
                  </div>
            </div>
        </div>
    );
};

export default News;
import React, { useState } from 'react';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNews';
import { useGetCryptoCoinsQuery } from '../services/cryptoCoinsApi';
import { Rings } from '../components';

const News = ({ shortened }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ newsCategory, count: shortened ? 5 : 20 });
    const { data: cryptoCoins } = useGetCryptoCoinsQuery(250);

    if (isFetching) return <Rings />;

    return (
        <>
            {!shortened && (
                <div className='flex items-center justify-center text-2xl pt-10'>
                    <select
                        placeholder='Select a Crypto'
                        className='h-12 pl-4'
                        optionfilterprop="children"
                        onChange={(e) => setNewsCategory(e.target.value.toLowerCase())}
                    >
                        <option value="Cryptocurrency">Select a Crypto</option>
                        {cryptoCoins?.map((coinNews) => (
                            <option key={coinNews.name} value={coinNews.name}>{coinNews.name}</option>
                        ))}
                    </select>
                </div>
            )}
            <div className='w-full flex justify-center pr-8 pb-8'>
                <div className='flex justify-center text-black pl-64 pt-10 w-100'>
                    <div className='grid lg:grid-cols-5 pl-10 gap-5 sm:grid-cols-3 md:grid-cols-3'>
                        {cryptoNews?.value?.map((cryptoArticle) => (
                            <div className='border-4 border-black flex flex-col items-center bg-purple-400'>
                                <a href={cryptoArticle.url}>
                                    <div className='flex flex-col items-center pl-4 pr-4'>
                                        <p className='text-3xl pt-3 font-bold'>{cryptoArticle.name}</p>
                                        <img src={cryptoArticle?.image?.thumbnail?.contentUrl} alt="" />
                                    </div>
                                    <p className='text-2xl pt-2 pl-4 pr-4'>{cryptoArticle.description > 100 ? `${cryptoArticle?.description.substring(0, 100)}...` : cryptoArticle.description}</p>
                                    <div className='grid grid-cols-3 place-content-evenly items-center space-x-10 text-lg pt-8'>
                                        <img className='h-10 pt-20' src={cryptoArticle?.provider[0]?.image?.thumbnail?.contentUrl} alt="" />
                                        <p>{cryptoArticle.provider[0]?.name}</p>
                                        <p>{moment(cryptoArticle.datePublished).startOf('ss').fromNow()}</p>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default News;
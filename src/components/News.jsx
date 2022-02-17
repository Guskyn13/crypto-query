import React, { useState } from 'react';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNews';
import { useGetCryptoCoinsQuery } from '../services/cryptoCoinsApi';
import { Rings } from '../components';
import demoImage from '../images/newsIcon.jpg';
import demoImage2 from '../images/newsCompanyIcon.jpg';

const News = ({ shortened }) => {
    const [newsCategory, setNewsCategory] = useState('Crypto');
    const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ newsCategory, count: shortened ? 4 : 20 });
    const { data: cryptoCoins } = useGetCryptoCoinsQuery(250);

    if (isFetching) return <Rings />;

    return (
        <>
            {!shortened && (
                <div className='flex items-center justify-center text-2xl pt-10'>
                    <select
                        placeholder='Select a Crypto'
                        className='h-12 pl-4 bg-gray-500'
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
            <div className='w-full flex justify-center pb-8'>
                <div className='flex justify-center text-black xl:pl-60 pr-10 pt-10 w-100'>

                    <div className='grid pl-10 gap-8 
                        2xl:grid-cols-4 
                        xl:grid-cols-3 
                        md:grid-cols-2 
                        '>
                        {cryptoNews?.value?.map((cryptoArticle) => (
                            <div className='border-black flex flex-col items-center bg-gray-500
                            xl:border-4
                            border-2
                            '>
                                <a href={cryptoArticle.url}>
                                    <div className='flex items-center justify-between pl-4 pr-4 pt-4 pb-4 border-b-2 border-black'>
                                        <p className='text-xl pt-2 font-bold'>{cryptoArticle.name}</p>
                                        <img className='h-20' src={cryptoArticle?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                                    </div>
                                    <p className='text-xl pt-4 pl-4 pr-4'>{cryptoArticle.description > 100 ? `${cryptoArticle?.description.substring(0, 100)}...` : cryptoArticle.description}</p>
                                    <div className='flex items-center justify-evenly text-base pt-8 pb-2'>
                                        <img className='h-8' src={cryptoArticle?.provider[0]?.image?.thumbnail?.contentUrl || demoImage2} alt="" />
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
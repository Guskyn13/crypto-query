import React, { useState } from 'react';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNews';
import { Rings } from '../components';

const News = ({ shortened }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ newsCategory, count: shortened ? 5 : 20 });

    if (isFetching) return <Rings />;

    return (
        <div className='w-full flex justify-center pr-8'>
            <div className='flex justify-center text-black pl-64 pt-10 w-100'>
                <div className='grid lg:grid-cols-5 pl-10 gap-5 sm:grid-cols-3 md:grid-cols-3'>
                    {cryptoNews?.value.map((cryptoArticle) => (
                        <div className='border-4 border-black flex flex-col items-center bg-purple-400'>
                            <a href={cryptoArticle.url}>
                                <div className='flex flex-col items-center pl-4 pr-4'>
                                    <p className='text-3xl pt-3 pb-3 font-bold'>{cryptoArticle.name}</p>
                                    <img className='pt-2 pb-2' src={cryptoArticle?.image?.thumbnail?.contentUrl} />
                                </div>
                                <p className='text-2xl pt-2 pl-4 pr-4'>{cryptoArticle.description > 25 ? `${cryptoArticle?.description.substring(0, 15)}...` : cryptoArticle.description}</p>
                                <div className='flex justify-center items-center space-x-10'>
                                    <img className='h-10 pt-20' src={cryptoArticle?.provider[0]?.image?.thumbnail?.contentUrl} alt="" />
                                    <p className='text-2xl'>{cryptoArticle.provider[0]?.name}</p>
                                </div>
                                <div className='flex justify-center text-xl pb-4'>
                                    <p>{moment(cryptoArticle.datePublished).startOf('ss').fromNow()}</p>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default News;
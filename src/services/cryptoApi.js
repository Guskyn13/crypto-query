import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const coinRankingHeaders = {
    'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST,
    'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
}

const createRequest = (url) => ({ url, headers: coinRankingHeaders })

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_COINRANKING_BASEURL }),
    endpoints: (builder) => ({

        getGlobalCryptoStats: builder.query({
            query: () => createRequest('/coins'),
        }),
        
    })
})

export const {
    useGetGlobalCryptoStatsQuery,
} = cryptoApi;
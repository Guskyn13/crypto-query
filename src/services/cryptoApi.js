import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const coinRankingHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '1b6e6bb7efmshd1b9a3b6e0d3e9fp1f5325jsn6be918f2d054',
}

const createRequest = (url) => ({ url, headers: coinRankingHeaders })

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://coinranking1.p.rapidapi.com' }),
    endpoints: (builder) => ({

        getGlobalCryptoStats: builder.query({
            query: () => createRequest('/coins'),
        }),
        
    })
})

export const {
    useGetGlobalCryptoStatsQuery,
} = cryptoApi;
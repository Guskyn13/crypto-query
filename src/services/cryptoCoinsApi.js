import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const coinGeckoHeaders = {
    'x-rapidapi-host': '',
    'x-rapidapi-key': '',
}

const createRequest = (url) => ({ url, headers: coinGeckoHeaders })

export const cryptoCoinsApi = createApi({
    reducerPath: 'cryptoCoinsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coingecko.com/api/v3' }),
    endpoints: (builder) => ({

        getCryptoCoins: builder.query({
            query: (count) => createRequest(`/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${count}&page=1&sparkline=false`),
        }),

        getCoinsDetail: builder.query({
            query: (coinId) => createRequest(`/coins/${coinId}`),
        }),

        getCryptoHistory: builder.query({
            query: ({ coinId, timePeriod }) => createRequest(`/coins/${coinId}/market_chart?vs_currency=usd&days=${timePeriod}`),
        }),
    })
})

export const {
    useGetCryptoCoinsQuery,
    useGetCoinsDetailQuery,
    useGetCryptoHistoryQuery,
} = cryptoCoinsApi;
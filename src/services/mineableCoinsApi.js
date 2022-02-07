import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const coinHeaders = {
    'x-rapidapi-host': process.env.REACT_APP_MINEABLE_HOST,
    'x-rapidapi-key': process.env.REACT_APP_MINEABLE_KEY,
}

const createRequest = (url) => ({ url, headers: coinHeaders })

export const mineableCoinsApi = createApi({
    reducerPath: 'mineableCoinsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_MINEABLE_BASEURL }),
    endpoints: (builder) => ({

        getMineableCoins: builder.query({
            query: () => createRequest('/coins'),
        }),
        
    })
})

export const {
    useGetMineableCoinsQuery,
} = mineableCoinsApi;
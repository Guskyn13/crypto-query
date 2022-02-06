import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const coinHeaders = {
    'x-rapidapi-host': 'mineable-coins.p.rapidapi.com',
    'x-rapidapi-key': 'd0084ba4f7msh82de2a2689b73bap164da5jsn3a7a9ca08ec3',
}

const createRequest = (url) => ({ url, headers: coinHeaders })

export const mineableCoinsApi = createApi({
    reducerPath: 'mineableCoinsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://mineable-coins.p.rapidapi.com' }),
    endpoints: (builder) => ({

        getMineableCoins: builder.query({
            query: () => createRequest('/coins'),
        }),
        
    })
})

export const {
    useGetMineableCoinsQuery,
} = mineableCoinsApi;
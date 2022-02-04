import { configureStore  } from "@reduxjs/toolkit";

import { cryptoApi  } from "../services/cryptoApi";
import { cryptoCoinsApi } from "../services/cryptoCoinsApi";
import { cryptoNewsApi } from "../services/cryptoNews";

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoCoinsApi.reducerPath]: cryptoCoinsApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    }
})
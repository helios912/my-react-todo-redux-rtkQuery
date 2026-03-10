import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import utilsReducer from './utilsSlice';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer, // RTK Query reducer // куди зберігати кеш запитів
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware), // логіка запитів
});

import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import utilsReducer from './utilsSlice';

export const store = configureStore({
    reducer: {
        todos: todosReducer,
        utils: utilsReducer,
    },
});

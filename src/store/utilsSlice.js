import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filter: 'all',
};

const utilsSlice = createSlice({
    name: 'utils',
    initialState,
    reducers: {
        updateFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
});

export const { updateFilter } = utilsSlice.actions;
export default utilsSlice.reducer;

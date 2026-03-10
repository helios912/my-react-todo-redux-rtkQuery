import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.push(action.payload);
        },
        toggleTodo: (state, action) => {
            const todo = state.find((t) => t.id === action.payload);
            if (todo) todo.completed = !todo.completed;
        },
        delTodo: (state, action) => {
            const todoId = action.payload;
            return state.filter((t) => t.id !== todoId);
        },
        resetTodo: () => {
            return initialState;
        },
        clearCompleted: (state) => {
            return state.filter((todo) => !todo.completed);
        },
    },
});
export const { addTodo, toggleTodo, delTodo, resetTodo, clearCompleted } =
    todosSlice.actions;
export default todosSlice.reducer;

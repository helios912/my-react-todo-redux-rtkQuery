import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// createApi — створює "API сервіс"
export const apiSlice = createApi({
    reducerPath: 'api', // ключ у store

    // базовий URL для всіх запитів
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/',
    }),

    tagTypes: ['Todos', 'Utils'], // теги для автооновлення кешу

    endpoints: (builder) => ({
        //   -------- Todos --------
        // 🔹 GET /books
        getTodos: builder.query({
            query: () => 'todos',
            providesTags: ['Todos'], // кешується як "Books"
        }),

        // 🔹 POST /books
        addTodo: builder.mutation({
            query: (newTodo) => ({
                url: 'todos',
                method: 'POST',
                body: newTodo,
            }),
            invalidatesTags: ['Todos'], // після додавання оновити список
        }),

        // 🔹 DELETE /books/:id
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `todos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todos'], // оновлює список
        }),
        updateTodo: builder.mutation({
            query: (id) => ({
                url: `todos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todos'], // оновлює список
        }),
        // ------ Utils -------
        getUtils: builder.query({
            query: () => 'utils',
            providesTags: ['Utils'],
        }),
        updateFilter: builder.mutation({
            query: (filter) => ({
                url: 'utils',
                method: 'PATCH',
                body: { filter },
            }),
            invalidatesTags: ['Utils'],
        }),
    }),
});

// Автоматично створені хуки
export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useDeleteTodoMutation,
    useGetUtilsQuery,
    useUpdateFilterMutation,
} = apiSlice;

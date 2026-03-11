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
            query: ({ id, ...patch }) => ({
                url: `todos/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: ['Todos'],
        }),
        clearTodos: builder.mutation({
            async queryFn(_, _queryApi, _extraOptions, fetchWithBQ) {
                // отримати всі todos
                const todosResult = await fetchWithBQ('todos');

                if (todosResult.error) {
                    return { error: todosResult.error };
                }

                const todos = todosResult.data;

                // видалити кожен todo
                await Promise.all(
                    todos.map((todo) =>
                        fetchWithBQ({
                            url: `todos/${todo.id}`,
                            method: 'DELETE',
                        }),
                    ),
                );

                return { data: null };
            },
            invalidatesTags: ['Todos'],
        }),
        clearCompleted: builder.mutation({
            queryFn: async (_, _queryApi, _extraOptions, fetchWithBQ) => {
                const todosResult = await fetchWithBQ('todos');

                if (todosResult.error) return { error: todosResult.error };

                const completed = todosResult.data.filter((t) => t.completed);

                await Promise.all(
                    completed.map((todo) =>
                        fetchWithBQ({
                            url: `todos/${todo.id}`,
                            method: 'DELETE',
                        }),
                    ),
                );

                return { data: null };
            },
            invalidatesTags: ['Todos'],
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
    useUpdateTodoMutation,
    useClearTodosMutation,
    useClearCompletedMutation,
} = apiSlice;

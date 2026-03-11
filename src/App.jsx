import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TodoList from '@components/TodoList';
import { v4 as uuidv4 } from 'uuid';

import './App.css';
import { addTodo } from './store/todosSlice';
import { updateFilter } from './store/utilsSlice';

import {
    useGetTodosQuery,
    useAddTodoMutation,
    useDeleteTodoMutation,
    useGetUtilsQuery,
    useUpdateFilterMutation,
} from './store/api/apiSlice';

function App() {
    const {
        data: todos,
        isLoading: todosLoading,
        error: todosError,
    } = useGetTodosQuery();
    const {
        data: utils,
        isLoading: utilsLoading,
        error: utilsError,
    } = useGetUtilsQuery();
    const [addTodo] = useAddTodoMutation();
    const [todoska, setTodoska] = useState('');
    const [updateFilter] = useUpdateFilterMutation();

    const dispatch = useDispatch();
    //const todos = useSelector((state) => state.todos);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!todoska.trim()) return;
        addTodo({ id: uuidv4(), text: todoska, completed: false });
        setTodoska('');
    };

    const complitedTodos = todos?.filter((item) => item.completed !== true);

    const todoCount = complitedTodos?.length;

    if (todosLoading || utilsLoading) return <p>Loading...</p>;
    if (todosError || utilsError) return <p>Error loading data</p>;

    return (
        <>
            <div>
                <h1>Мій перший todo list</h1>
                <form onSubmit={handleFormSubmit}>
                    <input
                        placeholder=" Введіть справу"
                        type="text"
                        value={todoska}
                        onChange={(e) => setTodoska(e.target.value)}
                    />
                    <button type="submit">Додати справу</button>
                </form>
                <div className="filter-btn_container">
                    <button onClick={() => updateFilter('all')}>Всі</button>
                    <button onClick={() => updateFilter('active')}>
                        Невиконані
                    </button>
                    <button onClick={() => updateFilter('completed')}>
                        Виконані
                    </button>
                </div>
            </div>
            <TodoList />
            {todoCount > 0 && (
                <p className="read-the-docs">
                    Зараз у Вас {todoCount}{' '}
                    {todoCount === 1
                        ? 'невиконана справа'
                        : 'невиконаних справ'}
                </p>
            )}
        </>
    );
}

export default App;

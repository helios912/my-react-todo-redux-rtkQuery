import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TodoList from '@components/TodoList';
import { v4 as uuidv4 } from 'uuid';

import './App.css';
import { addTodo } from './store/todosSlice';
import { updateFilter } from './store/utilsSlice';

function App() {
    const [todoska, setTodoska] = useState('');

    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!todoska.trim()) return;
        dispatch(addTodo({ id: uuidv4(), text: todoska, completed: false }));
        setTodoska('');
    };

    const complitedTodos = todos.filter((item) => item.completed !== true);

    const todoCount = complitedTodos.length;

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
                    <button onClick={() => dispatch(updateFilter('all'))}>
                        Всі
                    </button>
                    <button onClick={() => dispatch(updateFilter('active'))}>
                        Невиконані
                    </button>
                    <button onClick={() => dispatch(updateFilter('completed'))}>
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

import TodoItem from './TodoItem';
import { useSelector, useDispatch } from 'react-redux';
import { resetTodo, clearCompleted } from '../store/todosSlice';

function TodoList() {
    const todos = useSelector((state) => state.todos);
    const filter = useSelector((state) => state.utils.filter);
    const dispatch = useDispatch();
    const filterTodos = todos.filter((item) => {
        if (filter === 'active') return !item.completed;
        if (filter === 'completed') return item.completed;
        return true;
    });

    return (
        <>
            <div className="filter-btn__container">
                <button onClick={() => dispatch(resetTodo())}>
                    Очистити список
                </button>
                <button onClick={() => dispatch(clearCompleted())}>
                    Очистити виконані
                </button>
            </div>
            <h3 className="todo-list__title">Список справ</h3>
            <ul className="todo-list__items">
                {todos.length === 0 ? (
                    <p style={{ fontSize: 20 }}>Список пустий</p>
                ) : (
                    filterTodos.map((todo) => {
                        return <TodoItem key={todo.id} todo={todo} />;
                    })
                )}
                {}
            </ul>
        </>
    );
}

export default TodoList;

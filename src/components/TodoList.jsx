import TodoItem from './TodoItem';
import { useSelector, useDispatch } from 'react-redux';
import { resetTodo, clearCompleted } from '../store/todosSlice';
import {
    useGetTodosQuery,
    useAddTodoMutation,
    useDeleteTodoMutation,
    useGetUtilsQuery,
    useUpdateFilterMutation,
    useClearTodosMutation,
    useClearCompletedMutation,
} from '../store/api/apiSlice.js';

function TodoList() {
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
    const dispatch = useDispatch();
    const [clearTodos] = useClearTodosMutation();
    const [clearCompleted] = useClearCompletedMutation();
    const filterTodos =
        todos?.filter((item) => {
            if (utils?.filter === 'active') return !item.completed;
            if (utils?.filter === 'completed') return item.completed;
            return true;
        }) || [];

    if (todosLoading || utilsLoading) return <p>Loading...</p>;
    if (todosError || utilsError) return <p>Error loading data</p>;

    return (
        <>
            <div className="filter-btn__container">
                <button onClick={() => clearTodos()}>Очистити список</button>
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

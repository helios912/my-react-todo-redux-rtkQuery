import { FcCalendar } from 'react-icons/fc';
import { FcCheckmark } from 'react-icons/fc';
import { FcFullTrash } from 'react-icons/fc';
import { FcExport } from 'react-icons/fc';
import { useSelector, useDispatch } from 'react-redux';
import { delTodo, toggleTodo } from '../store/todosSlice';
import {
    useGetTodosQuery,
    useAddTodoMutation,
    useDeleteTodoMutation,
    useGetUtilsQuery,
    useUpdateFilterMutation,
    useUpdateTodoMutation,
} from '../store/api/apiSlice.js';

function TodoItem({ todo }) {
    const dispatch = useDispatch();
    const [deleteTodo] = useDeleteTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();

    return (
        <li className="todo-list__item">
            <div className="todo-item__container">
                <div>
                    <FcCalendar style={{ fontSize: 35, paddingRight: 20 }} />
                    {todo.text}
                </div>
                <div>
                    {!todo.completed ? (
                        <FcCheckmark
                            style={{ fontSize: 35, paddingRight: 20 }}
                            onClick={() =>
                                updateTodo({
                                    id: todo.id,
                                    completed: !todo.completed,
                                })
                            }
                        />
                    ) : (
                        <FcExport
                            style={{ fontSize: 35, paddingRight: 20 }}
                            onClick={() =>
                                updateTodo({
                                    id: todo.id,
                                    completed: !todo.completed,
                                })
                            }
                        />
                    )}

                    <FcFullTrash
                        onClick={() => deleteTodo(todo.id)}
                        style={{ fontSize: 35, paddingRight: 10 }}
                    />
                </div>
            </div>
        </li>
    );
}

export default TodoItem;

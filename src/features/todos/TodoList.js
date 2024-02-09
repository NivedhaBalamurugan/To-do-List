import {useGetTodosQuery,
    useUpdateTodoMutation,
    useAddTodoMutation,
    useDeleteTodoMutation} from '../api/apiSlice';
import { sortTodos } from '../api/apiSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"

const TodoList = () => {

    const [newTodo, setNewTodo] = useState('')

    const {         //destructuring
        data: todos,  //renaming data to todos
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTodosQuery()
   const [addTodo] = useAddTodoMutation()
   const [updateTodo] = useUpdateTodoMutation()
   const [deleteTodo] = useDeleteTodoMutation()


    const handleSubmit = () => {

        addTodo({ userId: 1, title: newTodo, completed: false })
        setNewTodo('')

    }


    let content;

    if(isLoading)
        content=<p>Loading...</p>
    else if(isSuccess)
        {
            content = sortTodos(todos).map((todo) => {

                return (

                    <article key={todo.id}>
                        <div className='todo'>
                            <input 
                                type="checkbox"
                                checked={todos.completed}
                                id={todos.id}
                                onChange={() => updateTodo({...todo, completed:!todo.completed})}
                            />
                            <label htmlFor='{todo.id}'>{todo.title}</label>
                        </div>
                        <button className='trash' onClick={() => deleteTodo({id:todo.id})}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </article>

                )

            })           

        }
    else if(isError)
        content=<p>{error.message}</p>


    
    return (

        <main>

            <h1>Todo List</h1>

            <form onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="new-todo">Enter a new todo item</label>
                <div className="new-todo">
                    <input
                        type="text"
                        id="new-todo"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Enter new todo"
                    />
                </div>
                <button className="submit" onClick={handleSubmit}>
                    <FontAwesomeIcon icon={faUpload} />
                </button>
             </form>

            {content}

        </main>

    )
}
export default TodoList
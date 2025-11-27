import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, removeTodo } from '../../Redux/todoSlice';

const Todo = () => {

  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  // Storing todos in local storage
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

    if (savedTodos.length > 0) {
      savedTodos.forEach((todo) => {
        dispatch({
          type: 'todos/loadFromStorage',
          payload: todo,
        });
      });
    }

  }, [dispatch])

  // Updating local storage when todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  const handleAddTodo = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    if (editId) {
      dispatch(removeTodo(editId));
      dispatch(addTodo(`${trimmed} (edited)`));
      setEditId(null);
    } else {
      dispatch(addTodo(trimmed));
    }

    setText("");
  };


  const handleEditTodo = (todo) => {
    setText(todo.text);
    setEditId(todo.id);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-6">Redux Todo App</h1>

      <div className="w-11/12 max-w-lg bg-white p-5 mb-6 rounded-lg">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter Your Todo List"
            className="flex-grow px-4 py-2 border rounded-md focus:outline-none  "
          />

          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
            onClick={handleAddTodo}
          >
            {editId ? "Edit Todo" : "Add Todo"}
          </button>
        </div>
      </div>


      <ul className="w-11/12 bg-white rounded-lg shadow p-5 space-y-4 max-w-lg ">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex justify-between items-center p-3 rounded-lg shadow-md ${todo.completed ? "bg-green-100" : "bg-gray-50"
              }`}
          >
            <div
              className={`flex flex-col cursor-pointer ${todo.completed
                ? "line-through text-gray-500"
                : "text-gray-800"
                }`}
              onClick={() => dispatch(toggleTodo(todo.id))}
            >
              <span>{todo.text}</span>
              <span>{new Date(todo.id).toLocaleString()}</span>
            </div>

            <div className="flex space-x-3">
              <button onClick={() => handleEditTodo(todo)} className="px-3 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 cursor-pointer">Edit</button>

              <button onClick={() => dispatch(removeTodo(todo.id))} className="px-3 py-1 bg-red-500 rounded-lg hover:bg-red-600 text-white cursor-pointer">Delete</button>
            </div>


          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
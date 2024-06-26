import React, { useState } from 'react';
import axios from 'axios';
import { AiFillDelete } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';

const TodoList = ({ todos,gettaskofuser, delTodo, updateTodo, completeTodo }) => {
  const [todoId, setTodoId] = useState(0);
  const [task, setTask] = useState('');
  const [toggle, setToggle] = useState(false);

  const todoItem = (id, task) => {
    setTodoId(id);
    setTask(task);
    setToggle(true);
  };

  const formatDateTime = (dateTimeStr) => {
    const dateTime = new Date(dateTimeStr);
    return dateTime.toLocaleString(); // Adjust date format as needed
  };

  const handleUpdate = (e, TodoId, task) => {
    e.preventDefault();
    updateTodo(e, TodoId, task);
    setToggle(false); // Close modal after update
    window.location.reload(); // Reload the page to refresh data (not recommended for production)
  };
  
  return (
    <>
      <div className="Todo_Table">
        <table>
          <thead>
            <tr>
              <th>Checkbox</th>
              <th>Task</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Updated Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <tr key={todo.id}>
                <td>
                  <input
                    type="checkbox"
                    onChange={(e) => completeTodo(e, todo.id, todo)}
                    checked={todo.completed}
                  />
                </td>
                <td className={todo.completed ? 'strike' : ''}>{todo.task}</td>
                <td>{todo.completed ? 'Completed' : 'Active'}</td>
                <td>{formatDateTime(todo.created)}</td>
                <td>{formatDateTime(todo.updated)}</td>
                <td>
                <FaEdit
                    size={25}
                    onClick={() => !todo.completed && todoItem(todo.id, todo.task)}
                    style={{
                      cursor: todo.completed ? 'not-allowed' : 'pointer',
                      marginRight: '10px',
                      color: todo.completed ? 'gray' : 'black',
                    }}
                  />
                  <AiFillDelete
                    size={25}
                    onClick={() => delTodo(todo.id)}
                    style={{ cursor: 'pointer' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {toggle && (
        <div className="Update_Box">
          <div className="Update_Form">
            <h1>Update Form</h1>
            <form action="" onSubmit={(e) => handleUpdate(e, todoId, task)}>
              <input
                type="text"
                placeholder="Update Todo"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                required
              />
              <button type="submit">Update</button>
            </form>
            <div className="Button_Box">
              <button className="cancel_button" onClick={() => setToggle(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoList;

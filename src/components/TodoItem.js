import React, { useState } from 'react';

const TodoItem = ({ addTodo }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== '') {
      addTodo({
        task: task,
        completed: false,
        created: new Date().toISOString(), // Use ISO string for consistent date format
      });
      setTask(''); // Clear input field after adding task
    }
  };

  return (
    <div className="Todo_Box">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter new task"
          required
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TodoItem;

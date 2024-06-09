import React from "react";

const Input = ({ task, setTask }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setTask(task.push(value));
  };
  return (
    <div>
      <form action="submit" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(event) => setTask(event.target.value)}
          value={task}
        />
        <button>Add Task</button>
      </form>
    </div>
  );
};

export default Input;

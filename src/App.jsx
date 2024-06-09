import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newTask) {
      try {
        const tasksCopy = [...tasks];
        const name = newTask;
        tasksCopy.push({ name });
        setTasks(tasksCopy);
        setNewTask("");
        await axios.post(`http://localhost:3000/tasks`, {
          name: name,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleDelete = async (id) => {
    try {
      const tasksCopy = [...tasks];
      setTasks(tasksCopy.filter((task) => task.id !== id));
      await axios.delete(`http://localhost:3000/tasks/${id}`);
    } catch (error) {}
  };
  const handleShowTask = async () => {
    try {
      const response = await axios.get(`http://localhost:3000`);
      const task = response.data;
      const tasksCopy = [...tasks];
      tasksCopy.push(task);
      setTasks(tasksCopy);
      console.log(task);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1>To do list</h1>
      <div className="todo">
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="input"
            placeholder="Add task"
            type="text"
            onChange={(event) => setNewTask(event.target.value)}
            value={newTask}
          />
          <button className="add-task" type="submit">
            Add Task
          </button>
        </form>
        <div className="display-task">
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                {task.name}
                <button onClick={() => handleDelete(task._id)}>X</button>
              </li>
            ))}
          </ul>
        </div>
        <button onClick={handleShowTask}>Show Task</button>
      </div>
    </>
  );
}
export default App;

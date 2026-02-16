import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const addTodo = () => {
    if (!task.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: task.trim(),
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setTask("");
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="container">
      <h1>Todo List</h1>

      <p className="task-counter">
        {completedCount} / {todos.length} completed
      </p>

      <div className="input-container">
        <input
          ref={inputRef}
          type="text"
          value={task}
          placeholder="Enter a task..."
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.length === 0 ? (
          <p className="empty-state">No tasks yet 🚀</p>
        ) : (
          todos.map((todo, index) => (
            <li key={todo.id}>
              <span className="todo-number">{index + 1}.</span>

              <span
                className={`todo-text ${todo.completed ? "completed" : ""}`}
                onClick={() => toggleComplete(todo.id)}
              >
                {todo.text}
              </span>

              <button
                className="delete-btn"
                onClick={() => deleteTodo(todo.id)}
              >
                ✕
              </button>
            </li>
          ))
        )}
      </ul>

    </div>
  );
}

export default App;

import { useState, useRef, useEffect } from "react";
import "./App.css";

function TaskCard({ todo, isLong, toggleComplete, deleteTodo }) {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef(null);

  const toggleExpand = () => {
    const el = contentRef.current;

    if (!el) return;

    if (!expanded) {
      // Opening
      el.style.maxHeight = el.scrollHeight + "px";
    } else {
      // Closing
      el.style.maxHeight = el.scrollHeight + "px";
      requestAnimationFrame(() => {
        el.style.maxHeight = "120px";
      });
    }

    setExpanded(!expanded);
  };

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (expanded) {
      el.style.maxHeight = el.scrollHeight + "px";
    } else {
      el.style.maxHeight = isLong ? "120px" : "none";
    }
  }, [expanded, isLong]);

  return (
    <div className="task-card">
      <div className="card-content">
        <div
          ref={contentRef}
          className={`text-wrapper ${isLong ? "is-long" : ""}`}
        >
          <p
            className={todo.completed ? "completed" : ""}
            onClick={() => toggleComplete(todo.id)}
          >
            {todo.text}
          </p>
        </div>

        {isLong && (
          <button className="show-more-btn" onClick={toggleExpand}>
            {expanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>

      <button
        className="delete-btn"
        onClick={() => deleteTodo(todo.id)}
      >
        ✕
      </button>
    </div>
  );
}


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
    <>
      {/* Sticky Header */}
      <header className="header">
        <h1>To Do List</h1>
        <span className="material-symbols-outlined">
          view_kanban
        </span>
      </header>


      {/* Input Section */}
      <section className="input-section">
        <div className="input-wrapper">
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
        {/* completed section */}
        <span className="task-stats">
          {completedCount} / {todos.length} completed
        </span>
      </section>




      {/* Main Grid */}
      <main className="task-grid">
        {todos.length === 0 ? (
          <p className="empty-state">No tasks yet 🚀</p>
        ) : (
          todos.map((todo) => {
            const words = todo.text.trim().split(/\s+/);
            const isLong = words.length > 50;

            return (
              <TaskCard
                key={todo.id}
                todo={todo}
                isLong={isLong}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            );
          })
        )}
      </main>

    </>
  );


}

export default App;

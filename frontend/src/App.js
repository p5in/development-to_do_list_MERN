import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Thodi styling ke liye

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // Component load hone par todos fetch karein
  useEffect(() => {
    axios
      .get("/api/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Naya todo add karne ka function
  const addTodo = (e) => {
    e.preventDefault();
    if (!text.trim()) return; // Khali todo na add ho
    axios
      .post("/api/todos", { text })
      .then((res) => {
        setTodos([...todos, res.data]);
        setText(""); // Input field clear karein
      })
      .catch((err) => console.error(err));
  };

  // Todo delete karne ka function
  const deleteTodo = (id) => {
    axios
      .delete(`/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((err) => console.error(err));
  };

  // Todo ko complete/incomplete mark karne ka function
  const toggleComplete = (id) => {
    axios
      .put(`/api/todos/${id}`)
      .then((res) => {
        setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>MERN To-Do List</h1>
        <form onSubmit={addTodo}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Naya task add karein..."
          />
          <button type="submit">Add</button>
        </form>
        <ul>
          {todos.map((todo) => (
            <li key={todo._id} className={todo.completed ? "completed" : ""}>
              <span onClick={() => toggleComplete(todo._id)}>{todo.text}</span>
              <button onClick={() => deleteTodo(todo._id)}>X</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;

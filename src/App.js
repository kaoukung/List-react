import './App.css';
import Todolist from './components/todolist';
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputText.trim() !== "") {
      const newTodo = {
        id: uuidv4(),
        text: inputText,
        completed: false,
        updatedAt: new Date ().toLocaleString(),
      };

      setTodos([newTodo, ...todos]);
      setInputText("");
    } else {
      alert("กรุณากรอกข้อความของท่าน !!");
    }
  };

  const handleToggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleRemoveTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };


  return (
    <div className='App'>
  <div className='card flex justify-center'>
    <div className=' mr-5 mt-5 ml-5 pb-5 border-2 border-black' >
     
      <div className='flex justify-center'>
        <h1>Todo list </h1>
      </div>

      <div className='flex justify-center'>
        <input
          type="text"
          placeholder="Type something..."
          value={inputText}
          onChange={handleInputChange}
        />
        <button className="btn btn-outline" onClick={handleAddTodo}> Add</button>
      </div>

      <div className="todos">
        {todos.map((todo) => (
          <Todolist
            key={todo.id}
            todo={todo}
            onToggleComplete={handleToggleComplete}
            onRemoveTodo={handleRemoveTodo}
          />
        ))}
      </div>
    </div>
  </div>
</div>
  );
}

export default App;

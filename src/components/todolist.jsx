import React, { useState } from "react";
import { ImBin } from "react-icons/im";

const Todolist = ({ todo, onToggleComplete, onRemoveTodo }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggleComplete = () => {
    setIsChecked(!isChecked);
    onToggleComplete(todo.id);
  };

  const handleRemoveTodo = () => {
    const shouldDelete = window.confirm("ต้องการลบหรือไม่ ?");

    if (shouldDelete) {
      onRemoveTodo(todo.id);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="card-actions justify-end">
            <button className="btn btn-square btn-sm" onClick={handleRemoveTodo}>
              <ImBin style={{ color: "red" }} />
            </button>
          </div>
          <div className={`todo ${isChecked ? "completed" : ""}`}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleToggleComplete}
            />
            <div className="flex justify-center mb-7">
            <span className="mr-10">{todo.text}</span>
            <span className="date">{todo.updatedAt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todolist;

import { useState } from "react";
import Check from "../assets/images/icon-check.svg";
import Cross from "../assets/images/icon-cross.svg";

const TodoItem = ({ id, todo, completed, deleteTodo, onClick }) => {
  const [showCancelIcon, setShowCancelIcon] = useState(false);
  return (
    <li
      className="todoItemContainer"
      onMouseEnter={() => setShowCancelIcon(true)}
      onMouseLeave={() => setShowCancelIcon(false)}
    >
      <div className="todoItemCompleted" onClick={onClick}>
        {completed ? (
          <div className="checkIconContainer">
            <img src={Check} alt="Check" />
          </div>
        ) : (
          <div className="todoCircle"></div>
        )}
      </div>
      <p
        className="todoItemText"
        style={
          completed
            ? { textDecoration: "line-through", opacity: 0.75 }
            : { textDecoration: "none" }
        }
      >
        {todo}
      </p>
      <div className="todoItemCancelIconContainer">
        {showCancelIcon && (
          <button onClick={deleteTodo}>
            <img src={Cross} alt="Delete" />
          </button>
        )}
      </div>
    </li>
  );
};

export default TodoItem;

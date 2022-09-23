import { useState, useEffect } from "react";
import Check from "../../assets/images/icon-check.svg";
import Cross from "../../assets/images/icon-cross.svg";
import classNameTheme from "../../helpers/classnametheme";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import "./todobody.css"

const TodoItem = ({ theme, todo, completed, deleteTodo, onClick }) => {
  const { width } = useWindowDimensions();
  const [showCancelIcon, setShowCancelIcon] = useState(false);
  useEffect(() => {
    if (width < 530) {
      setShowCancelIcon(true);
    }
  }, []);
  return (
    <li
      className={classNameTheme(theme, "todoItemContainer")}
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

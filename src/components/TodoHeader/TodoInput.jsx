import { useContext, useState } from "react";
import { TodoContext } from "../../store/todo-context";
import classNameTheme from "../../helpers/classnametheme";
import { nanoid } from "nanoid";
import "./todoheader.css"

const TodoInput = ({ theme }) => {
  const todoObject = useContext(TodoContext);
  const [inputValue, setInputValue] = useState("");

  const enterKeyPress = (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      const todoText = event.target.value;
      const todo = { id: nanoid(), todo: todoText, completed: false };
      todoObject.newTodo(todo);
      setInputValue("");
    }
  };

  return (
    <div className={classNameTheme(theme, "TodoInput")}>
      <div className="todoItemCompleted">
        <div className="TodoInputCircle"></div>
      </div>
      <input
        type="text"
        name="newTodoBox"
        id="newTodoBox"
        placeholder="Create a new todo ..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => enterKeyPress(e)}
      />
    </div>
  );
};

export default TodoInput;

import { useContext } from "react";
import { TodoContext } from "../store/todo-context";
import { ThemeContext } from "../store/theme-context";
import classNameTheme from "../helpers/classnametheme";

function TodoFooterListItem({ id, title, onClick }) {
  return (
    <li style={id === title ? { color: "blue" } : { color: "inherit" }}>
      <button onClick={onClick}>{title}</button>
    </li>
  );
}

const TodoFooter = () => {
  const theme = useContext(ThemeContext);
  const todoObject = useContext(TodoContext);
  const numberOfTodosLeft =
    todoObject.todos.length - todoObject.completedTodos.length;

  const TodosToShowSwitcherFn = (listitem) => {
    todoObject.setCurrentCategory(listitem);
  };

  return (
    <footer className={classNameTheme(theme, "todoFooter")}>
      <div>
        <p>
          {numberOfTodosLeft} item{numberOfTodosLeft === 1 ? "" : "s"} left
        </p>
      </div>
      <div className="todoFooterControls">
        <ul>
          {["All", "Active", "Completed"].map((listitem) => (
            <TodoFooterListItem
              key={listitem}
              id={listitem}
              title={listitem}
              onClick={() => TodosToShowSwitcherFn(listitem)}
            />
          ))}
        </ul>
      </div>
      <div>
        <button>Clear Completed</button>
      </div>
    </footer>
  );
};

export default TodoFooter;

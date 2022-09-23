import { useContext } from "react";
import { TodoContext } from "../../store/todo-context";
import classNameTheme from "../../helpers/classnametheme";
import "./todofooter.css"

function TodoFooterListItem({ id, title, onClick }) {
  return (
    <li style={id === title ? { color: "#3a7bfd" } : { color: "inherit" }}>
      <button onClick={onClick}>{title}</button>
    </li>
  );
}

const TodoFooter = ({ theme }) => {
  const todoObject = useContext(TodoContext);
  const numberOfTodosLeft = todoObject.TodosToShow("Active").length;

  const TodosToShowSwitcherFn = (listitem) => {
    todoObject.setCurrentCategory(listitem);
  };

  return (
    todoObject.todos.length > 0 && (
      <footer className={classNameTheme(theme, "todoFooter")}>
        <div>
          <p>
            {numberOfTodosLeft} item{numberOfTodosLeft === 1 ? "" : "s"} left
          </p>
        </div>
        <div className={classNameTheme(theme, "todoFooterControls")}>
          <ul>
            {["All", "Active", "Completed"].map((listitem) => (
              <TodoFooterListItem
                key={listitem}
                id={todoObject.currentCategory}
                title={listitem}
                onClick={() => TodosToShowSwitcherFn(listitem)}
              />
            ))}
          </ul>
        </div>
        <div>
          <button onClick={() => todoObject.clearCompletedTodos()}>
            Clear Completed
          </button>
        </div>
      </footer>
    )
  );
};

export default TodoFooter;

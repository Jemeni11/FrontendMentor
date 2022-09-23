import { useContext } from "react";
import { TodoContext } from "../../store/todo-context";
import classNameTheme from "../../helpers/classnametheme";
import TodoItem from "./TodoItem";
import "./todobody.css"

const TodoList = ({ theme }) => {
  const todoObject = useContext(TodoContext);
  let todos = todoObject.TodosToShow(todoObject.currentCategory);

  return (
    todoObject.todos.length > 0 && (
      <ul className={classNameTheme(theme, "todoItemList")}>
        {todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              theme={theme}
              deleteTodo={() => todoObject.removeTodo(todo.id)}
              onClick={() => todoObject.updateTodo(todo.id)}
              {...todo}
            />
          );
        })}
      </ul>
    )
  );
};

export default TodoList;

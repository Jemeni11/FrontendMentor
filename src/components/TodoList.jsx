import { useContext, useEffect } from "react";
import { TodoContext } from "../store/todo-context";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const todoObject = useContext(TodoContext);
  // let todos = todoObject.todos
  let todos = todoObject.TodosToShow(todoObject.currentCategory);

  // useEffect(() => {
  //   todos = todoObject.TodosToShow(todoObject.currentCategory);
  //   console.log(todoObject.currentCategory)
  // }, [todoObject.currentCategory])

  return (
    <ul className="todoItemList">
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            deleteTodo={() => todoObject.removeTodo(todo.id)}
            onClick={() => todoObject.updateTodo(todo.id)}
            {...todo}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;

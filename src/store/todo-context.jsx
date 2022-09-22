import { createContext, useState } from "react";

const initialState = [{ id: 0, todo: "", completed: false }];

export const TodoContext = createContext({
  todos: initialState,
  setTodos: (newTodo) => {},
  newTodo: (newTodo) => {},
  updateTodo: (id) => {},
  removeTodo: (id) => {},
  completedTodos: () => [],
  currentCategory: "",
  setCurrentCategory: () => {},
  TodosToShow: (id) => [],
  clearCompletedTodos: () => {},
});

export default function TodoContextProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All");

  const newTodo = (newTodoObject) => {
    setTodos((prevArray) => [...prevArray, newTodoObject]);
  };

  const updateTodo = (id) => {
    const todo = todos.filter((todo) => todo.id === id)[0];
    setTodos((prevArray) => [
      { ...todo, completed: !todo.completed },
      ...prevArray.filter((todoItem) => todoItem.id !== id),
    ]);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const activeTodos = () => {
    return todos.filter((todo) => !todo.completed);
  };

  const completedTodos = () => {
    return todos.filter((todo) => todo.completed);
  };

  const clearCompletedTodos = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const TodosToShow = (id) => {
    switch (id) {
      case "Active":
        return activeTodos();
      case "Completed":
        return completedTodos();
      case "clearAllCompletedTodos":
        clearCompletedTodos();
        return todos;
      case "All":
      default:
        return todos;
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos: todos,
        setTodos: setTodos,
        newTodo: newTodo,
        currentCategory: currentCategory,
        setCurrentCategory: setCurrentCategory,
        updateTodo: updateTodo,
        removeTodo: removeTodo,
        completedTodos: completedTodos,
        TodosToShow: TodosToShow,
        clearCompletedTodos: clearCompletedTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

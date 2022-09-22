import { useContext, useEffect } from "react";
import { ThemeContext } from "./store/theme-context";
import { TodoContext } from "./store/todo-context";
import classNameTheme from "./helpers/classnametheme";
import TodoHeader from "./components/TodoHeader";
import TodoList from "./components/TodoList";
import TodoFooter from "./components/TodoFooter";

function App() {
  const theme = useContext(ThemeContext);
  const todoObject = useContext(TodoContext);

  useEffect(() => {
    <TodoList/>
  }, [todoObject]);

  return (
    <div className="App">
      <TodoHeader theme={theme} />
      <div className={classNameTheme(theme, "body")}>
        <TodoList />
        <TodoFooter />
      </div>
    </div>
  );
}

export default App;

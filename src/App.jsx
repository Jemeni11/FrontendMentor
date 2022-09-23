import { useContext } from "react";
import { ThemeContext } from "./store/theme-context";
import classNameTheme from "./helpers/classnametheme";
import {TodoHeader, TodoList, TodoFooter} from "./components"

function App() {
  const theme = useContext(ThemeContext);
  
  return (
    <div className="App">
      <TodoHeader theme={theme} />
      <div className={classNameTheme(theme, "body")}>
        <TodoList theme={theme} />
        <TodoFooter theme={theme} />
      </div>
    </div>
  );
}

export default App;

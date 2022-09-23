import classNameTheme from "../../helpers/classnametheme";
import TodoInput from "./TodoInput";
import Moon from "../../assets/images/icon-moon.svg";
import Sun from "../../assets/images/icon-sun.svg";
import "./todoheader.css"

const TodoHeader = ({ theme }) => {
  return (
    <header className={classNameTheme(theme, "header")}>
      <div>
        <h1>TODO</h1>
        <div className="themeChangeButtonContainer">
          <button onClick={() => theme.changeTheme(theme)}>
            <img
              src={theme.theme === "light" ? Moon : Sun}
              alt="A button to change the theme of the webpage"
            />
          </button>
        </div>
      </div>
      <TodoInput theme={theme} />
    </header>
  );
};

export default TodoHeader;

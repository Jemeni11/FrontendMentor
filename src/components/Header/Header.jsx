import classNameTheme from "../../helpers/classnametheme";
import LightMode from "../../assets/images/icon-light_mode.svg";
import DarkMode from "../../assets/images/icon-dark_mode.svg";
import "./header.css";

const Header = ({ theme }) => {
  return (
    <header className={classNameTheme(theme, "header")}>
      <span className="fw-600">Where in the World?</span>
      <button onClick={() => theme.changeTheme(theme)}>
        <img src={theme.theme === "light" ? LightMode : DarkMode} alt="theme" />
        <span className="fw-300">
          {theme.theme === "light" ? "Light Mode" : "Dark Mode"}
        </span>
      </button>
    </header>
  );
};

export default Header;

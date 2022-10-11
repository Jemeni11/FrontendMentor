import classNameTheme from "../../helpers/classnametheme";
import Search from "../../assets/images/icon-search.svg";
import "./input.css";

const Input = ({ theme, inputState, setInputState }) => {
  return (
    <div className={classNameTheme(theme, "inputContainer")}>
      <img src={Search} alt="search icon" />
      <input
        type="text"
        placeholder="Search for a country..."
        value={inputState}
        onChange={(e) => setInputState(e.target.value)}
      />
    </div>
  );
};

export default Input;

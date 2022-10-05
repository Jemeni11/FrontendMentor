import { createContext, useState } from "react";

const themes = ["light", "dark"];

export const themeContext = createContext({
  theme: themes[0],
  changeTheme: (theme) => (theme.theme === "dark" ? "light" : "dark"),
});

export default function ThemeContextProvider(props) {
  const [theme, setTheme] = useState(themes[0]);

  function changeTheme(theme) {
    setTheme(theme.theme === "dark" ? "light" : "dark");
  }

  return (
    <themeContext.Provider value={{ theme, changeTheme }}>
      {props.children}
    </themeContext.Provider>
  );
}

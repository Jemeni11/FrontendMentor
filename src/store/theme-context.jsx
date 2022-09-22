import { createContext, useState } from "react";

export const themes = ["light", "dark"];

export const ThemeContext = createContext({
  theme: "light",
  changeTheme: (theme) => {
    theme.theme === "dark" ? "light" : "dark";
  },
});

export default function ThemeContextProvider(props) {
  const [theme, setTheme] = useState(themes[0]);

  function changeTheme(theme) {
    setTheme(theme.theme === "dark" ? "light" : "dark");
  }

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

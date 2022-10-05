export default function classNameTheme(theme, className) {
  return `${className} ${
    theme.theme === "light" ? `${className}Light` : `${className}Dark`
  }`;
}

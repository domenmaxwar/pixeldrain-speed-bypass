import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("wireframe");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      // If there's a saved theme in localStorage, use it
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      // If no theme is saved in localStorage, detect the device's theme preference
      const deviceTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "black" // Device prefers dark mode
        : "wireframe"; // Default to wireframe if device prefers light mode

      setTheme(deviceTheme);
      document.documentElement.setAttribute("data-theme", deviceTheme);

      // Save the device's theme to localStorage
      localStorage.setItem("theme", deviceTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "wireframe" ? "black" : "wireframe";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

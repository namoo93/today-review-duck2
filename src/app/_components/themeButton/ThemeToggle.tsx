"use client";

import { useContext } from "react";
import styles from "./theme.module.css";
import { ThemeContext } from "@/app/_theme/ThemeProvider";

export default function ThemeToggle() {
  const { state, actions } = useContext(ThemeContext);
  const item = actions.setTheme("light");
  console.log("state :", state, "actions : ", item);
  const toggleTheme = () => {
    // actions.setTheme(state.theme === "light" ? "dark" : "light");
  };

  return (
    <button className={styles.toggleButton} onClick={() => toggleTheme}>
      {state.theme == "light" ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}

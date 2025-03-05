"use client";

import { createContext, useCallback, useEffect, useReducer } from "react";
import { ReactNode } from "react";

export type ThemeType = "light" | "dark";

type ThemeState = {
  theme: ThemeType;
};

const initialThemeState: ThemeState = {
  theme: "light",
};

type Action =
  | { type: "SET_THEME"; payload: ThemeType }
  | { type: "SET_THEME_TO_LIGHT" }
  | { type: "SET_THEME_TO_DARK" };

const reducers = (state: ThemeState, action: Action): ThemeState => {
  switch (action.type) {
    case "SET_THEME":
      return { theme: action.payload };
    case "SET_THEME_TO_DARK":
      return { theme: "dark" };
    case "SET_THEME_TO_LIGHT":
      return { theme: "light" };
    default:
      return state;
  }
};

export interface ThemeContextType {
  state: ThemeState;
  actions: {
    setTheme: (payload: ThemeType) => void;
    setThemeToDark: () => void;
    setThemeToLight: () => void;
  };
}

export const ThemeContext = createContext<ThemeContextType>({
  state: initialThemeState,
  actions: {
    setTheme: () => {},
    setThemeToDark: () => {},
    setThemeToLight: () => {},
  },
});

function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeState, dispatch] = useReducer(reducers, initialThemeState);

  // 🟢 Next.js에서 안전하게 테마 로드 (서버-클라이언트 불일치 방지)
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as ThemeType | null;
    if (storedTheme === "light" || storedTheme === "dark") {
      dispatch({ type: "SET_THEME", payload: storedTheme });
    }
  }, []);

  // 🔹 테마 변경 시 localStorage 업데이트
  const handleSetTheme = useCallback((payload: ThemeType) => {
    dispatch({ type: "SET_THEME", payload });
    localStorage.setItem("theme", payload);
  }, []);

  const handleSetThemeToDark = useCallback(() => {
    dispatch({ type: "SET_THEME_TO_DARK" });
    localStorage.setItem("theme", "dark");
  }, []);

  const handleSetThemeToLight = useCallback(() => {
    dispatch({ type: "SET_THEME_TO_LIGHT" });
    localStorage.setItem("theme", "light");
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        state: themeState,
        actions: {
          setTheme: handleSetTheme,
          setThemeToDark: handleSetThemeToDark,
          setThemeToLight: handleSetThemeToLight,
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider };

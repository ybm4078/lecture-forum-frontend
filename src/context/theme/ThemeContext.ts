import { createContext } from "react";

export type ThemeMode = "light" | "dark";

export type ThemeContextType = {
    theme: ThemeMode;
    onChangeTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

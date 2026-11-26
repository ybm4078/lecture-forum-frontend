import GlobalStyle from "./styles/GlobalStyle.ts";
import {ThemeProvider} from "styled-components";
import {RouterProvider} from "react-router";
import { darkTheme, lightTheme } from "./styles/theme.ts";
import GetRouter from "./Router/GetRouter.tsx";
import { ThemeContext } from "./context/theme/ThemeContext.ts";
import { useEffect, useState } from "react";

function App() {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === "dark" ? "dark" : "light";
    });

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    const onChangeTheme = () => {
        setTheme(prev => {
            return prev === "dark" ? "light" : "dark";
        });
    };

  return (
      <ThemeContext.Provider value={{theme,onChangeTheme}}>
          <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
              <GlobalStyle />
              <RouterProvider router={GetRouter} />
          </ThemeProvider>
      </ThemeContext.Provider>
  );
}
export default App;
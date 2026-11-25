import GlobalStyle from "./styles/GlobalStyle.ts";
import {ThemeProvider} from "styled-components";
import {RouterProvider} from "react-router";
import {lightTheme} from "./styles/theme.ts";
import GetRouter from "./Router/GetRouter.tsx";

function App() {
  return (
      <ThemeProvider theme={lightTheme}>
          <GlobalStyle />
          <RouterProvider router={GetRouter} />
      </ThemeProvider>
  );
}
export default App;
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import router from "./route/Router.js";
// import { ChakraProvider } from "@chakra-ui/react";
import GlobalProvider from "./context/GlobalContext.jsx";
import GlobalStyle from "./styles/global.js";
import theme from "./styles/theme.js";
import { ThemeProvider } from "styled-components";
import App from "./App";
import Home from "./pages/Home";
import MarketPlace from "./pages/MarketPlace";
import MyPage from "./pages/MyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "market_place",
        element: <MarketPlace />,
      },
      {
        path: "mypage",
        element: <MyPage />,
      },
    ],
    errorElement: <div>404 Not Found</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  // <ChakraProvider>
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <GlobalProvider>
        <RouterProvider router={router} />
      </GlobalProvider>
    </ThemeProvider>
  </>
  // </ChakraProvider>
);

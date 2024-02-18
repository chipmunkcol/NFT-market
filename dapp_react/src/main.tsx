import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Home from "../pages/Home.jsx";
import MyPage from "../pages/MyPage.jsx";
import MarketPlace from "../pages/MarketPlace.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { ChakraProvider } from "@chakra-ui/react";
import GlobalProvider from "../context/GlobalContext.jsx";

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
  <GlobalProvider>
    <RouterProvider router={router} />
  </GlobalProvider>
  // </ChakraProvider>
);

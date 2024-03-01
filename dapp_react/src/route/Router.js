import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import MarketPlace from "../pages/MarketPlace";
import MyPage from "../pages/MyPage";

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

export default router;

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
import Create from "./pages/Create.jsx";
import MyPage from "./pages/MyPage";
import MintNft from "./pages/Create/MintNft.jsx";
import Collection from "./pages/Create/Collection.jsx";
import C_step1 from "./pages/Create/CollectionComponents/C_step1.jsx";
import C_step2 from "./pages/Create/CollectionComponents/C_step2.jsx";
import All from "./pages/mypageComponents/All.jsx";
import Nonsale from "./pages/mypageComponents/Nonsale.jsx";
import Onsale from "./pages/mypageComponents/Onsale.jsx";
import Sold from "./pages/mypageComponents/Sold.jsx";
import NftDetail from "./pages/NftDetail.jsx";

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
        path: "market-place",
        element: <MarketPlace />,
      },
      {
        path: "nft-detail/:ipfsHash/:nftId",
        element: <NftDetail />,
      },
      {
        path: "create",
        element: <Create />,
        // children: [
        //   {
        //     path: "collection",
        //     element: <Collection />,
        //   },
        //   {
        //     path: "mint-nft",
        //     element: <MintNft />,
        //   },
        // ],
      },
      {
        path: "create-collection",
        element: <Collection />,
        children: [
          {
            path: "step-1",
            element: <C_step1 />,
          },
          {
            path: "step-2",
            element: <C_step2 />,
          },
        ],
      },
      {
        path: "create-mint-nft",
        element: <MintNft />,
      },
      {
        path: "mypage",
        element: <MyPage />,
        children: [
          {
            path: "",
            element: <All />,
          },
          {
            path: "non-sale",
            element: <Nonsale />,
          },
          {
            path: "on-sale",
            element: <Onsale />,
          },
          {
            path: "sold",
            element: <Sold />,
          },
        ],
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

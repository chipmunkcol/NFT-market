import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import "@fontsource/inter"; // Defaults to weight 400
import "@fontsource/inter/400.css"; // Specify weight
import "@fontsource/inter/400-italic.css"; // Specify weight and style
// import router from "./route/Router.js";
import GlobalProvider from "./context/GlobalContext";
import GlobalStyle from "./styles/global.js";
import theme from "./styles/theme.js";
import { ThemeProvider } from "styled-components";

import App from "./App";
import Home from "./pages/Home";
import { createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";

// lazy
const MarketPlace = lazy(() => import("./pages/MarketPlace"));
const MarketPlaceCollection = lazy(
  () => import("./pages/marketPlace/Collection")
);
const MarketPlacenNft = lazy(() => import("./pages/marketPlace/Nft"));
const Create = lazy(() => import("./pages/Create"));
const MyPage = lazy(() => import("./pages/MyPage"));
const MintNft = lazy(() => import("./pages/Create/MintNft"));
const Collection = lazy(() => import("./pages/Create/Collection"));
const C_step1 = lazy(
  () => import("./pages/Create/CollectionComponents/C_step1")
);
const C_step2 = lazy(
  () => import("./pages/Create/CollectionComponents/C_step2.js")
);
const All = lazy(() => import("./pages/mypageComponents/All"));
const Nonsale = lazy(() => import("./pages/mypageComponents/Nonsale"));
const Onsale = lazy(() => import("./pages/mypageComponents/Onsale"));
const Sold = lazy(() => import("./pages/mypageComponents/Sold"));
const NftDetail = lazy(() => import("./pages/NftDetail"));
const CollectionNftDetail = lazy(() => import("./pages/CollectionNftDetail"));

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </QueryClientProvider>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "market-place",
        element: <MarketPlace />,
        children: [
          {
            path: "nft",
            element: <MarketPlacenNft />,
          },
          {
            path: "collection",
            element: <MarketPlaceCollection />,
          },
        ],
      },
      {
        path: "nft-detail",
        children: [
          {
            path: ":ipfsHash/:nftId",
            element: <NftDetail />,
          },
          {
            path: "collection/:ipfsHash/:nftId",
            element: <CollectionNftDetail />,
          },
        ],
      },
      {
        path: "create",
        element: <Create />,
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
        path: "mypage/:account",
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

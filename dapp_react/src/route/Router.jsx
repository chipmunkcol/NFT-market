import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import MarketPlace from "../pages/MarketPlace.jsx";
import MyPage from "../pages/MyPage.jsx";
import NftDetail from "../pages/NftDetail.jsx";
import Create from "../pages/Create.jsx";
// import MyPage from "./pages/MyPage";
import MintNft from "../pages/Create/MintNft.jsx";
import Collection from "../pages/Create/Collection.jsx";
import C_step1 from "../pages/Create/CollectionComponents/C_step1.jsx";
import C_step2 from "../pages/Create/CollectionComponents/C_step2.jsx";
import All from "../pages/mypageComponents/All.jsx";
import Nonsale from "../pages/mypageComponents/Nonsale.jsx";
import Onsale from "../pages/mypageComponents/Onsale.jsx";
import Sold from "../pages/mypageComponents/Sold.jsx";
// import NftDetail from "./pages/NftDetail";

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
        path: "market-place?",
        element: <MarketPlace />,
      },
      {
        path: "nft-detail/:ipfsHash/:nftId",
        element: <NftDetail />,
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
        path: "mypage/:address",
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
    errorElement: <div>Not Found</div>,
  },
]);

export default router;

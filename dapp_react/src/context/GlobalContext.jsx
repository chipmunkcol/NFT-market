import { createContext, useMemo, useState } from "react";

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [myNfts, setMyNfts] = useState([]);
  const [onsaleNftList, setOnsaleNftList] = useState([]);
  const [purchaseTrigger, setpurchaseTrigger] = useState(false);

  const contextValue = useMemo(() => ({
    account,
    setAccount,
    myNfts,
    setMyNfts,
    onsaleNftList,
    setOnsaleNftList,
    purchaseTrigger,
    setpurchaseTrigger
  }), [account, myNfts, onsaleNftList, purchaseTrigger])
  return (
    <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>
  )
};

export default GlobalProvider;
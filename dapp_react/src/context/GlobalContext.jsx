import { createContext, useMemo, useState } from "react";

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  const [account, setAccount] = useState("연결된 계정이 없습니다");
  const [myNfts, setMyNfts] = useState([]);
  const [onsaleNftList, setOnsaleNftList] = useState([]);
  const [trigger, setTrigger] = useState(false);

  const contextValue = useMemo(() => ({
    account,
    setAccount,
    myNfts,
    setMyNfts,
    onsaleNftList,
    setOnsaleNftList,
    trigger,
    setTrigger
  }), [account, myNfts, onsaleNftList, trigger])
  return (
    <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>
  )
};

export default GlobalProvider;
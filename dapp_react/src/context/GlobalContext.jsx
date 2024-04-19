import { createContext, useMemo, useState } from "react";

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [myNfts, setMyNfts] = useState([]);
  const [onsaleNftList, setOnsaleNftList] = useState([]);
  const [purchaseTrigger, setpurchaseTrigger] = useState(false);
  const [collection, setCollection] = useState({
    name: "",
    desc: "",
    tags: "",
    files: null,
    filesLength: 0,
    perPrice: 0,
    startAt: 0,
    preReleaseIpfsHash: "",
    preReleaseDesc: "",
    address: "",
  });

  const resetCollection = () => {
    setCollection({
      name: "",
      desc: "",
      tags: "",
      files: null,
      filesLength: 0,
      perPrice: 0,
      startAt: 0,
      preReleaseIpfsHash: "",
      preReleaseDesc: "",
      address: "",
    });
  }

  const contextValue = useMemo(() => ({
    account,
    setAccount,
    myNfts,
    setMyNfts,
    onsaleNftList,
    setOnsaleNftList,
    purchaseTrigger,
    setpurchaseTrigger,
    collection,
    setCollection,
    resetCollection,
  }), [account, myNfts, onsaleNftList, purchaseTrigger, collection])
  return (
    <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>
  )
};

export default GlobalProvider;
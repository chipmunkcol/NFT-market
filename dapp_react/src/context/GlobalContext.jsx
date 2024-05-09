import React, { createContext, useMemo, useState } from "react";

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [myNfts, setMyNfts] = useState([]);
  const [onsaleNftList, setOnsaleNftList] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [onsaleTrigger, setOnsaleTrigger] = useState(false);
  const [purchaseTrigger, setPurchaseTrigger] = useState(false);
  const [nft, setNft] = useState({
    name: "",
    description: "",
    image: "",
    // file
    attributes: [
      {
        trait_type: "",
        value: "",
      }
    ],
  });

  const [collectionIndex, setCollectionIndex] = useState(0);
  const [collection, setCollection] = useState({
    name: "",
    description: "",
    image: "",
    attributes: [
      {
        trait_type: "",
        value: "",
      }
    ],
    nfts: [], // type: nft[]
    nftsLength: 0,
    perPrice: 0,
    startAt: 0,
    preReleaseIpfsHash: "",
    preReleaseDescription: "",
    address: "",
  });

  const resetCollection = () => {
    setCollection(
      {
        name: "",
        description: "",
        image: "",
        attributes: [
          {
            trait_type: "",
            value: "",
          }
        ],
        files: null,
        filesLength: 0,
        perPrice: 0,
        startAt: 0,
        preReleaseIpfsHash: "",
        preReleaseDescription: "",
        address: "",
      }
    );
  }

  const contextValue = useMemo(() => ({
    account,
    setAccount,
    myNfts,
    setMyNfts,
    onsaleNftList,
    setOnsaleNftList,
    trigger,
    setTrigger,
    collection,
    setCollection,
    resetCollection,
    nft,
    setNft,
    collectionIndex,
    setCollectionIndex,
    onsaleTrigger,
    setOnsaleTrigger,
    purchaseTrigger,
    setPurchaseTrigger
  }), [account, myNfts, onsaleNftList, trigger, nft, collection, collectionIndex, onsaleTrigger, purchaseTrigger])
  return (
    <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>
  )
};

export default GlobalProvider;
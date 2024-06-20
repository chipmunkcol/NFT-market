import React, { createContext, useMemo, useRef, useState } from "react";

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [signer, setSigner] = useState(null); // [signer, setSigner] = useState(null)
  const [loadingState, setLoadingState] = useState({
    isLoading: false,
    message: ""
  });
  const [myNfts, setMyNfts] = useState([]);
  const [onsaleNftList, setOnsaleNftList] = useState([]);
  const onsaleNftRef = useRef([]);
  const onsaleCollectionRef = useRef([]);
  // const [onsaleNftListLength, setOnsaleNftListLength] = useState(0); // onsaleNftList.length
  const onsaleNftListLength = useRef(0);
  const [trigger, setTrigger] = useState(false);
  const [onsaleTrigger, setOnsaleTrigger] = useState(false);
  const [purchaseTrigger, setPurchaseTrigger] = useState(false);
  const getAllonsaleNftListRef = useRef(null);
  const [offset, setOffset] = useState({ page: 0 });

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
    // description: "",
    // image: "",
    tags: [],
    nfts: [], // type: nft[]
    nftsLength: 0,
    perPrice: 0,
    startAt: 0,
    preReleaseJsonData: {
      description: "",
      file: null,
    }
    // preReleaseIpfsHash: "",
    // preReleaseDescription: "",
    // address: "",
  });

  const resetCollection = () => {
    setCollection({
      name: "",
      tags: [],
      nfts: [],
      nftsLength: 0,
      perPrice: 0,
      startAt: 0,
      preReleaseJsonData: {
        description: "",
        file: null,
      }
    });
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
    setPurchaseTrigger,
    getAllonsaleNftListRef,
    offset,
    setOffset,
    loadingState,
    setLoadingState,
    onsaleNftListLength,
    signer,
    setSigner,
    onsaleNftRef,
    onsaleCollectionRef
  }), [onsaleCollectionRef, onsaleNftRef, signer, account, myNfts, onsaleNftList, trigger, nft, collection, collectionIndex, onsaleTrigger, purchaseTrigger, offset, loadingState, onsaleNftListLength])
  return (
    <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>
  )
};

export default GlobalProvider;
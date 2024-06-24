import Swal from "sweetalert2";
import { web3, SaleNftContract } from "../../contracts/index";
import {
  transactWithPurchaseNft,
  transactWithSetOnsaleNft,
  transactWithSetOnsaleNfts,
} from "../../contracts/interface";

export const getImageUrl = (imageIpfsHash) => {
  return `${
    import.meta.env.VITE_GATEWAY_URL
  }/ipfs/${imageIpfsHash}?pinataGatewayToken=${
    import.meta.env.VITE_GATEWAY_TOKEN
  }`;
};

export const getIpfsTokenData = async (tokenUrl) => {
  const res = await fetch(
    `${import.meta.env.VITE_GATEWAY_URL}/ipfs/${tokenUrl}?pinataGatewayToken=${
      import.meta.env.VITE_GATEWAY_TOKEN
    }`
    // `https://ipfs.io/ipfs/${tokenUrl}`
  );
  const resJson = await res.json();
  return resJson;
};

export const ipfsGetOptions = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_IPFS_JWT}`,
  },
};

export const ipfsPutOptions = (jsonKeyvalues) => {
  return {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_IPFS_JWT}`,
      "Content-Type": "application/json",
    },
    body: jsonKeyvalues,
  };
};

export const P_updateMetadataSetOnsale = async (nftId, ipfsData, price) => {
  // const { numberOfSales, priceHistory } = ipfsData.metadata.keyvalues;
  const { isCollection } = ipfsData.metadata.keyvalues;
  let jsonKeyvalues, numberOfSales;
  if (isCollection === "true") {
    const collectionNftList = JSON.parse(
      ipfsData.metadata.keyvalues.nftKeyvaluesList
    );
    const targetNft = collectionNftList.find((nft) => nft.nftId === nftId);
    ({ numberOfSales } = targetNft);

    const newCollectionNftList = collectionNftList.map((nft) =>
      nft.nftId === nftId
        ? {
            ...nft,
            isOnsale: String(true),
            nftPrice: price,
            numberOfSales: numberOfSales + 1,
          }
        : nft
    );
    jsonKeyvalues = JSON.stringify({
      ipfsPinHash: ipfsData.ipfs_pin_hash,
      name: ipfsData.metadata.name,
      keyvalues: {
        ...ipfsData.metadata.keyvalues,
        numberOfSales: numberOfSales + 1,
        nftKeyvaluesList: JSON.stringify(newCollectionNftList),
      },
    });
  } else {
    const { numberOfSales, priceHistory } = ipfsData.metadata.keyvalues;
    const checkNumberOfSales = numberOfSales
      ? { numberOfSales: numberOfSales }
      : { numberOfSales: 0 };
    const checkPriceHistory = priceHistory
      ? { priceHistory: priceHistory }
      : { priceHistory: JSON.stringify([]) };

    jsonKeyvalues = JSON.stringify({
      ipfsPinHash: ipfsData.ipfs_pin_hash,
      name: ipfsData.metadata.name,
      keyvalues: {
        ...ipfsData.metadata.keyvalues,
        nftId,
        isOnsale: String(true),
        nftPrice: price,
        ...checkNumberOfSales,
        ...checkPriceHistory,
      },
    });
  }

  const result = await fetch(
    "https://api.pinata.cloud/pinning/hashMetadata",
    ipfsPutOptions(jsonKeyvalues)
  );
  // const temp = await result.json();
  // console.log("temp: ", temp);
  return result;
};

export const getNftListToIpfs = async (url) => {
  const res = await fetch(url, ipfsGetOptions);
  const result = await res.json();
  return result.rows;
};

export const getNftListAndCountToIpfs = async (url) => {
  const res = await fetch(url, ipfsGetOptions);
  const result = await res.json();
  const ipfsDatas = result.rows;
  const count = result.count;
  return { ipfsDatas, count };
};

export const getTargetNftToIpfsData = async (tokenUrl) => {
  const res = await fetch(
    `https://api.pinata.cloud/data/pinList?cid=${tokenUrl}`,
    ipfsGetOptions
  );
  const result = await res.json();
  return result.rows[0];
};

export const P_AddNftIdOnCollection = async (tokenUrl, nftIds) => {
  const res = await getTargetNftToIpfsData(tokenUrl);
  const nftKeyvaluesList = JSON.parse(res.metadata.keyvalues.nftKeyvaluesList);

  const _newNftKeyvaluesList = nftKeyvaluesList.map((nft, index) => ({
    ...nft,
    nftId: parseInt(nftIds[index]),
    tokenUrl,
  }));
  const newNftKeyvaluesList = JSON.stringify(_newNftKeyvaluesList);

  const name = res.metadata.name ? res.metadata.name : "";
  const jsonKeyvalues = JSON.stringify({
    ipfsPinHash: tokenUrl,
    name,
    keyvalues: {
      ...res.metadata.keyvalues,
      nftKeyvaluesList: newNftKeyvaluesList,
    },
  });

  const result = await fetch(
    "https://api.pinata.cloud/pinning/hashMetadata",
    ipfsPutOptions(jsonKeyvalues)
  );
  return result;
};

export const P_updateMetadataAirdrop = async (tempIpfs, collectionIpfs) => {
  const res = await getTargetNftToIpfsData(tempIpfs);
  const _keyvalues = res.metadata.keyvalues;
  const _nftKeyvaluesList = JSON.parse(_keyvalues.nftKeyvaluesList);
  const newNftKeyvaluesList = _nftKeyvaluesList.map((nft) => ({
    ...nft,
    tokenUrl: collectionIpfs,
    isReveal: true,
  }));

  const name = res.metadata.name;
  const jsonKeyvalues = JSON.stringify({
    ipfsPinHash: collectionIpfs,
    name,
    keyvalues: {
      ..._keyvalues,
      nftKeyvaluesList: JSON.stringify(newNftKeyvaluesList),
      isHide: String(false),
    },
  });

  const result = await fetch(
    "https://api.pinata.cloud/pinning/hashMetadata",
    ipfsPutOptions(jsonKeyvalues)
  );
  return result;
};

export const P_removeMetadataAirdrop = async (tempIpfs, account) => {
  const res = await getTargetNftToIpfsData(tempIpfs);

  const name = res.metadata.name;
  const jsonKeyvalues = JSON.stringify({
    ipfsPinHash: tempIpfs,
    name,
    keyvalues: {
      owner: account,
    },
  });

  const result = await fetch(
    "https://api.pinata.cloud/pinning/hashMetadata",
    ipfsPutOptions(jsonKeyvalues)
  );
  return result;
};

export const getCurrentTime = () => {
  const date = new Date();
  return String(date);
};

export const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  return `${year}.${month}.${day} ${hour}:${minute}`;
};

/**
 *
 * @param {string} date
 */
export const getCurrentYMD = (date) => {
  const dateObject = new Date(date);
  const year = String(dateObject.getFullYear()).slice(2);
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

export const getAddedPriceHistory = (priceHistory, owner, price) => {
  const _priceHistory = JSON.parse(priceHistory);
  const newPriceHistory = [..._priceHistory];
  const soldTime = getCurrentTime();
  newPriceHistory.unshift({ owner, price, soldTime });
  return JSON.stringify(newPriceHistory);
};

export const P_updateMetadataPurchase = async (nftId, ipfsData, account) => {
  const { isCollection } = ipfsData.metadata.keyvalues;

  let numberOfSales, priceHistory, owner, nftPrice;
  if (isCollection === "true") {
    const collectionNftList = JSON.parse(
      ipfsData.metadata.keyvalues.nftKeyvaluesList
    );
    const targetNft = collectionNftList.find((nft) => nft.nftId === nftId);
    ({ numberOfSales, priceHistory, owner, nftPrice } = targetNft);
  } else {
    ({ numberOfSales, priceHistory, owner, nftPrice } =
      ipfsData.metadata.keyvalues);
  }

  const newPriceHistory = getAddedPriceHistory(priceHistory, owner, nftPrice);

  let jsonKeyvalues;
  if (isCollection === "true") {
    const collectionNftList = JSON.parse(
      ipfsData.metadata.keyvalues.nftKeyvaluesList
    );
    const newCollectionNftList = collectionNftList.map((nft) =>
      nft.nftId === nftId
        ? {
            ...nft,
            owner: account,
            isOnsale: String(false),
            nftPrice: 0,
            numberOfSales: numberOfSales + 1,
            priceHistory: newPriceHistory,
          }
        : nft
    );
    jsonKeyvalues = JSON.stringify({
      ipfsPinHash: ipfsData.ipfs_pin_hash,
      name: ipfsData.metadata.name,
      keyvalues: {
        ...ipfsData.metadata.keyvalues,
        numberOfSales: numberOfSales + 1,
        nftKeyvaluesList: JSON.stringify(newCollectionNftList),
      },
    });
  } else {
    jsonKeyvalues = JSON.stringify({
      ipfsPinHash: ipfsData.ipfs_pin_hash,
      name: ipfsData.metadata.name,
      keyvalues: {
        ...ipfsData.metadata.keyvalues,
        nftId,
        owner: account,
        isOnsale: String(false),
        nftPrice: 0,
        numberOfSales: numberOfSales + 1,
        priceHistory: newPriceHistory,
      },
    });
  }

  const result = await fetch(
    "https://api.pinata.cloud/pinning/hashMetadata",
    ipfsPutOptions(jsonKeyvalues)
  );
  return result;
};

export const C_setOnsaleNft = async (signer, nftId, price) => {
  const weiPrice = web3.utils.toWei(price, "ether");
  const result = await transactWithSetOnsaleNft(signer, nftId, weiPrice);
  return result;
};

export const C_setOnsaleNfts = async (signer, nftIds, price) => {
  const weiPrice = web3.utils.toWei(price, "ether");
  const result = await transactWithSetOnsaleNfts(signer, nftIds, weiPrice);
  return result;
};

export const getImageIpfsHash = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_IPFS_JWT}`,
    },
    body: formData,
  });
  const resData = await res.json();
  return resData.IpfsHash;
};

export const pinJsonToIPFS = async (imageIpfsHash, metaData, jsonData) => {
  const { name, description, attributes } = jsonData;
  const jsonContent = JSON.stringify({
    name,
    description,
    image: imageIpfsHash,
    attributes: JSON.stringify(attributes),
  });
  // const jsonMetadata = JSON.stringify(metaData);

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_IPFS_JWT}`,
      "Content-Type": "application/json",
    },
    body: `{"pinataMetadata":${metaData}, "pinataContent":${jsonContent}}`,
  };

  const res = await fetch(
    "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    options
  );
  const result = await res.json();
  return result.IpfsHash;
};

export const pinFileToIPFS = async (files, metaData) => {
  const formData = new FormData();
  const options = JSON.stringify({
    cidVersion: 0,
  });

  Array.from(files).forEach(async (file) => {
    formData.append("file", file);
  });
  formData.append("pinataMetadata", metaData);
  formData.append("pinataOptions", options);

  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_IPFS_JWT}`,
    },
    body: formData,
  });
  const result = await res.json();
  return result.IpfsHash;
};

export const validateCollectionData = (account, collection) => {
  if (!account) {
    Swal.fire("지갑을 연결해주세요");
    return false;
  }
  if (collection.nfts?.length < 1) {
    Swal.fire("NFT Collection으로 발행할 json 파일을 업로드해주세요");
    return false;
  }
  if (!collection.name) {
    Swal.fire("이름을 입력해주세요");
    return false;
  }
  if (!collection.perPrice) {
    Swal.fire("판매 가격을 입력해주세요");
    return false;
  }
  if (!collection.startAt) {
    Swal.fire("Air drop 예정 시간을 입력해주세요");
    return false;
  }
  if (!collection.preReleaseJsonData.file) {
    Swal.fire("사전 공개 이미지를 업로드해주세요");
    return false;
  }
  if (!collection.preReleaseJsonData.description) {
    Swal.fire("사전 공개 설명을 입력해주세요");
    return false;
  }
  return true;
};

export const validateFormData = (account, jsonData, file) => {
  if (!account) {
    Swal.fire("지갑을 연결해주세요");
    return false;
  }
  if (!jsonData.name) {
    Swal.fire("이름을 입력해주세요");
    return false;
  }
  if (!jsonData.description) {
    Swal.fire("설명을 입력해주세요");
    return false;
  }
  if (!file) {
    Swal.fire("파일을 선택해주세요");
    return false;
  }
  return true;
};

export const getRemovedNftListByPurchase = (nftId, nfts) => {
  return nfts.filter((nft) => nft.nftId !== nftId);
};

// 장바구니 구현

export const pinJsonToIPFSForCart = async (owner, nft) => {
  const jsonContent = JSON.stringify({
    owner,
    description: "Market-place 장바구니 구현을 위한 위한 데이터베이스 용 JSON",
  });

  const metaData = JSON.stringify({
    name: `cart-${owner}`,
    keyvalues: {
      cart: JSON.stringify([nft]),
    },
  });

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_IPFS_JWT}`,
      "Content-Type": "application/json",
    },
    body: `{"pinataContent":${jsonContent},"pinataMetadata":${metaData}}`,
  };

  const res = await fetch(
    "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    options
  );
  const result = await res.json();
  return result.IpfsHash;
};

const checkDuplicattion = (cartList, nft) => {
  const isDuplicated = cartList.some((cart) => cart.nftId === nft.nftId);
  return isDuplicated;
};

export const P_updateMetadataAddCart = async (cartIpfsHash, nft) => {
  const res = await getTargetNftToIpfsData(cartIpfsHash);
  const cartList = JSON.parse(res.metadata.keyvalues.cart);
  const isDuplicated = checkDuplicattion(cartList, nft);
  if (isDuplicated) return;

  const jsonKeyvalues = JSON.stringify({
    ipfsPinHash: cartIpfsHash,
    name: res.metadata.name,
    keyvalues: {
      ...res.metadata.keyvalues,
      cart: JSON.stringify([...cartList, nft]),
    },
  });

  const result = await fetch(
    "https://api.pinata.cloud/pinning/hashMetadata",
    ipfsPutOptions(jsonKeyvalues)
  );
  return result;
};

export const P_updateMetadataRemoveCart = async (cartIpfsHash, _nftId) => {
  const res = await getTargetNftToIpfsData(cartIpfsHash);
  const cartList = JSON.parse(res.metadata.keyvalues.cart);
  const newCartList = cartList.filter((cart) => cart.nftId !== _nftId);

  const jsonKeyvalues = JSON.stringify({
    ipfsPinHash: cartIpfsHash,
    name: res.metadata.name,
    keyvalues: {
      ...res.metadata.keyvalues,
      cart: JSON.stringify(newCartList),
    },
  });

  const result = await fetch(
    "https://api.pinata.cloud/pinning/hashMetadata",
    ipfsPutOptions(jsonKeyvalues)
  );
  return result;
};

export const P_updateMetadataRemoveAllCart = async (cartIpfsHash) => {
  const res = await getTargetNftToIpfsData(cartIpfsHash);
  const jsonKeyvalues = JSON.stringify({
    ipfsPinHash: cartIpfsHash,
    name: res.metadata.name,
    keyvalues: {
      ...res.metadata.keyvalues,
      cart: JSON.stringify([]),
    },
  });

  const result = await fetch(
    "https://api.pinata.cloud/pinning/hashMetadata",
    ipfsPutOptions(jsonKeyvalues)
  );
  return result;
};

export async function purchaseNftHandler(nftId, tokenUrl, nftPrice, signer) {
  try {
    const weiPrice = web3.utils.toWei(nftPrice, "ether");
    const res = await transactWithPurchaseNft(signer, nftId, weiPrice);
    if (!res.status) return false;

    const ipfsData = await getTargetNftToIpfsData(tokenUrl);
    const updateResult = await P_updateMetadataPurchase(
      nftId,
      ipfsData,
      signer.address
    );
    if (updateResult.ok) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log("err: ", err);
    return false;
  }
}

// 장바구니에 담기
export const addCartHandler = async (nft, account) => {
  let cartIpfsHash = localStorage.getItem(`cart-${account}`);

  try {
    if (!cartIpfsHash) {
      cartIpfsHash = await pinJsonToIPFSForCart(account, nft);
      cartIpfsHash &&
        localStorage.setItem(`cart-${account}`, JSON.stringify(cartIpfsHash));
    } else {
      const paredCartIpfsHash = JSON.parse(cartIpfsHash);
      const updateMetadataResult = await P_updateMetadataAddCart(
        paredCartIpfsHash,
        nft
      );

      if (updateMetadataResult.ok) {
        return true;
      }
    }
  } catch (err) {
    console.log("err: ", err);
    return false;
  }
};

export const getTruncatedAccount = (account) => {
  if (typeof account !== "string") return null;
  return account
    ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
    : null;
};

export const getNewOnsaleNfts = (ipfsNftsList) => {
  if (!ipfsNftsList) return;
  let newOnsaleNfts = [];
  ipfsNftsList.forEach((data) => {
    const collectionIpfs = data?.ipfs_pin_hash;
    if (!data.metadata.keyvalues.nftKeyvaluesList) return;
    const parsedCollectionNftList = JSON.parse(
      data.metadata.keyvalues?.nftKeyvaluesList
    );

    const newCollectionNftList = parsedCollectionNftList.map((v) => ({
      ...v,
      nftName: v.name,
      collectionIpfs,
    }));
    newOnsaleNfts = [...newOnsaleNfts, ...newCollectionNftList];
  });
  return newOnsaleNfts;
};

export const formatPrice = (nftPrice) => {
  const formattedNum = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(nftPrice);
  return formattedNum;
};

export const commingSoon = () => {
  Swal.fire("준비중 입니다");
};

export function isArraysEqual(arr1, arr2) {
  if (typeof arr1 !== "object" || typeof arr2 !== "object") return false;
  // 두 배열의 길이가 다르면 false 반환
  if (arr1?.length !== arr2?.length) return false;

  // 각 배열의 객체들을 id로 정렬
  arr1.sort((a, b) => a.id - b.id);
  arr2.sort((a, b) => a.id - b.id);

  // 정렬된 배열의 객체들의 id를 비교
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i].id !== arr2[i].id) {
      return false;
    }
  }

  // 모든 id가 같으면 true 반환
  return true;
}

export const findNftsSoldExpensively = (ipfsList) => {
  const nftList = ipfsList.map((ipfsData) => ({
    ...ipfsData.metadata.keyvalues,
    tokenUrl: ipfsData.ipfs_pin_hash,
  }));

  const expensiveNfts = [];
  for (let i = 0; i < nftList.length; i++) {
    if (!nftList[i].priceHistory) continue;
    const targetNftPriceHistory = JSON.parse(nftList[i].priceHistory);
    const latestSoldPrice = targetNftPriceHistory[0].price;
    if (latestSoldPrice > 0.19) {
      // priceHistory
      expensiveNfts.push(nftList[i]);
    }
  }
  return expensiveNfts;
};

export const findTop10NumberOfSales = (ipfsList) => {
  const nftList = ipfsList.map((ipfsData) => ({
    ...ipfsData.metadata.keyvalues,
    tokenUrl: ipfsData.ipfs_pin_hash,
  }));

  nftList.sort((a, b) => b.numberOfSales - a.numberOfSales);
  return nftList.slice(0, 10);
};

export const findTopCollectorNfts = (ipfsDatas) => {
  if (ipfsDatas.length === 0) return [];
  const collections = ipfsDatas.map((ipfsData) => ipfsData.metadata.keyvalues);
  collections.sort((a, b) => b.numberOfSales - a.numberOfSales);
  const topCollectorNfts = JSON.parse(collections[0].nftKeyvaluesList);
  return topCollectorNfts;
};

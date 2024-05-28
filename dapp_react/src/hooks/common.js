import { web3, SaleNftContract } from "../../contracts/index";

export const getImageUrl = (imageIpfsHash) => {
  return `${import.meta.env.VITE_GATEWAY_URL}/ipfs/${imageIpfsHash}`;
};

export const getIpfsTokenData = async (tokenUrl) => {
  const res = await fetch(
    `${import.meta.env.VITE_GATEWAY_URL}/ipfs/${tokenUrl}?pinataGatewayToken=${
      import.meta.env.VITE_GATEWAY_TOKEN
    }`
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
  const { numberOfSales, priceHistory } = ipfsData.metadata.keyvalues;
  const checkNumberOfSales = numberOfSales
    ? { numberOfSales: numberOfSales }
    : { numberOfSales: 0 };
  const checkPriceHistory = priceHistory
    ? { priceHistory: priceHistory }
    : { priceHistory: JSON.stringify([]) };

  const jsonKeyvalues = JSON.stringify({
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
  // const year = date.getFullYear();
  // const month = String(date.getMonth() + 1).padStart(2, "0");
  // const day = String(date.getDate()).padStart(2, "0");

  // return `${year}-${month}-${day}`;
  return String(date);
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
  const { numberOfSales, priceHistory, owner, nftPrice } =
    ipfsData.metadata.keyvalues;

  const newPriceHistory = getAddedPriceHistory(priceHistory, owner, nftPrice);

  const jsonKeyvalues = JSON.stringify({
    ipfsPinHash: ipfsData.ipfs_pin_hash,
    name: ipfsData.metadata.name,
    keyvalues: {
      ...ipfsData.metadata.keyvalues,
      nftId,
      isOnsale: String(false),
      nftPrice: 0,
      numberOfSales: numberOfSales + 1,
      priceHistory: newPriceHistory,
    },
  });

  const result = await fetch(
    "https://api.pinata.cloud/pinning/hashMetadata",
    ipfsPutOptions(jsonKeyvalues)
  );
  return result;
};

export const C_setOnsaleNft = async (nftId, price, account) => {
  const weiPrice = web3.utils.toWei(price, "ether");
  const result = await SaleNftContract.methods
    .setOnsaleNft(nftId, weiPrice)
    .send({
      from: account,
    });
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
    alert("지갑을 연결해주세요");
    return false;
  }
  if (collection.nfts?.length < 1) {
    alert("NFT Collection으로 발행할 json 파일을 업로드해주세요");
    return false;
  }
  if (!collection.name) {
    alert("이름을 입력해주세요");
    return false;
  }
  if (!collection.perPrice) {
    alert("판매 가격을 입력해주세요");
    return false;
  }
  if (!collection.startAt) {
    alert("Air drop 예정 시간을 입력해주세요");
    return false;
  }
  if (!collection.preReleaseJsonData.file) {
    alert("사전 공개 이미지를 업로드해주세요");
    return false;
  }
  if (!collection.preReleaseJsonData.description) {
    alert("사전 공개 설명을 입력해주세요");
    return false;
  }
  return true;
};

export const validateFormData = (account, jsonData, file) => {
  if (!account) {
    alert("지갑을 연결해주세요");
    return false;
  }
  if (!jsonData.name) {
    alert("이름을 입력해주세요");
    return false;
  }
  if (!jsonData.description) {
    alert("설명을 입력해주세요");
    return false;
  }
  if (!file) {
    alert("파일을 선택해주세요");
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

export async function purchaseNftHandler(nftId, tokenUrl, nftPrice, account) {
  try {
    const ipfsData = await getTargetNftToIpfsData(tokenUrl);
    const updateResult = await P_updateMetadataPurchase(
      nftId,
      ipfsData,
      account
    );
    if (!updateResult.ok) return;

    const weiPrice = web3.utils.toWei(nftPrice, "ether");
    const res = await SaleNftContract.methods
      .purchaseNft(nftId)
      .send({ from: account, value: weiPrice });
    // console.log('res: ', res);
    if (res.status) {
      return true;
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

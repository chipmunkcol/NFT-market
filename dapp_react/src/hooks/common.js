import { web3, SaleNftContract } from "../../contracts/index";

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
  const { numberOfSales, priceHistory, owner, isCollection } =
    ipfsData.metadata.keyvalues;
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
      nftId,
      owner,
      isOnsale: String(true),
      nftPrice: price,
      isCollection,
      ...checkNumberOfSales,
      ...checkPriceHistory,
    },
  });

  const result = await fetch(
    "https://api.pinata.cloud/pinning/hashMetadata",
    ipfsPutOptions(jsonKeyvalues)
  );
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

export const getTargetNftToIpfsDataMetadata = async (tokenUrl) => {
  const res = await fetch(
    `https://api.pinata.cloud/data/pinList?cid=${tokenUrl}`,
    ipfsGetOptions
  );
  const result = await res.json();
  return result.rows[0];
};

export const P_AddNftIdOnCollection = async (tokenUrl, nftIds) => {
  const res = await getTargetNftToIpfsDataMetadata(tokenUrl);
  const nftKeyvaluesList = JSON.parse(res.metadata.keyvalues.nftKeyvaluesList);

  const _newNftKeyvaluesList = nftKeyvaluesList.map((nft, index) => ({
    ...nft,
    nftId: parseInt(nftIds[index]),
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

export const getAddedPriceHistory = (priceHistory, owner, price) => {
  const _priceHistory = JSON.parse(priceHistory);
  const newPriceHistory = [..._priceHistory];
  newPriceHistory.unshift({ owner, price });
  return JSON.stringify(newPriceHistory);
};

export const P_updateMetadataPurchase = async (nftId, ipfsData, account) => {
  const { numberOfSales, priceHistory, owner, nftPrice, isCollection } =
    ipfsData.metadata.keyvalues;

  const newPriceHistory = getAddedPriceHistory(priceHistory, owner, nftPrice);

  const jsonKeyvalues = JSON.stringify({
    ipfsPinHash: ipfsData.ipfs_pin_hash,
    name: ipfsData.metadata.name,
    keyvalues: {
      nftId,
      owner: account,
      isOnsale: String(false),
      nftPrice: 0,
      isCollection,
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
    body: `{"pinataContent":${jsonContent},"pinataMetadata":${metaData}}`,
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

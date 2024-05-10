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
  const { numberOfSales, priceHistory, owner } = ipfsData.metadata.keyvalues;
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

export const getTargetNftToIpfsDataMetadata = async (tokenUrl) => {
  const res = await fetch(
    `https://api.pinata.cloud/data/pinList?cid=${tokenUrl}`,
    ipfsGetOptions
  );
  const result = await res.json();
  return result.rows[0];
};

export const getAddedPriceHistory = (priceHistory, owner, price) => {
  const _priceHistory = JSON.parse(priceHistory);
  const newPriceHistory = [..._priceHistory];
  newPriceHistory.unshift({ owner, price });
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
      nftId,
      owner: account,
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

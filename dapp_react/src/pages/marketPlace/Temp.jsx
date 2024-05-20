useEffect(() => {
  const fetchOnsaleNftIdsInContract = async () => {
    const _onsaleNftIdsInContract = await SaleNftContract.methods.getOnsaleNfts().call();
    setOnsaleNftsInContract(_onsaleNftIdsInContract);
  }
  fetchOnsaleNftIdsInContract();
}, [onsaleTrigger]);

const getNewOnsaleNfts = ipfsNftsList => ipfsNftsList.map(data => ({
  ...data.metadata.keyvalues,
  nftName: data.metadata.name,
  tokenUrl: data.ipfs_pin_hash
}));

const checkContractNftsToIpfsNfts = (onsaleNftsInContract, onsaleNftsInIpfs) => onsaleNftsInIpfs.filter(ipfsNft => onsaleNftsInContract.some(contractNft => (parseInt(contractNft.nftId) === ipfsNft.nftId && contractNft.tokenUrl === ipfsNft.tokenUrl)));

const getIpfsNftList = async (url) => {
  const ipfsDatas = await getNftListToIpfs(url);
  const newOnsaleNfts = getNewOnsaleNfts(ipfsDatas);
  const commonNfts = checkContractNftsToIpfsNfts(onsaleNftsInContract, newOnsaleNfts)
  setOnsaleNftList(commonNfts);
  console.log('newOnsaleNfts: ', newOnsaleNfts);
}

const getOnsaleNftList = () => {
  let url = `https://api.pinata.cloud/data/pinList?pinStart=20240515`;
  if (query) {
    url += `&metadata[name]=${encodedSearchQuery}`;
  }
  url += `&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"false","op":"eq"}}`;
  getIpfsNftList(url);
}

useEffect(() => {
  getOnsaleNftList();
}, [onsaleNftsInContract, query, offset, onsaleTrigger, purchaseTrigger]);
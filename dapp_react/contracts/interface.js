import {
  MintContract,
  SaleNftContract,
  MintAddress,
  SaleNftAddress,
} from "./index";

const consoleEtherscan = (hash) => {
  console.log("Etherscan 바로가기", `https://sepolia.etherscan.io/tx/${hash}`);
};

export async function transactWithUserMintNft(signer, tokenName, tokenUrl) {
  const contractABI = MintContract.methods
    .userMintNft(tokenName, tokenUrl)
    .encodeABI();

  const tx = await signer.sendTransaction({
    to: MintAddress,
    data: contractABI,
  });
  const receipt = await tx.wait();
  consoleEtherscan(receipt.hash);
  return receipt;
}

export async function transactWithApprove(signer, nftId) {
  const contractABI = MintContract.methods
    .approve(SaleNftAddress, nftId)
    .encodeABI();

  const tx = await signer.sendTransaction({
    to: MintAddress,
    data: contractABI,
  });
  const receipt = await tx.wait();
  consoleEtherscan(receipt.hash);
  return receipt;
}

export async function transactWithApproveCollection(signer, nftIds) {
  const contractABI = MintContract.methods
    .approveCollection(SaleNftAddress, nftIds)
    .encodeABI();

  const tx = await signer.sendTransaction({
    to: MintAddress,
    data: contractABI,
  });
  const receipt = await tx.wait();
  consoleEtherscan(receipt.hash);
  return receipt;
}

export async function transactWithSetOnsaleNft(signer, nftId, price) {
  const contractABI = SaleNftContract.methods
    .setOnsaleNft(nftId, price, signer.address)
    .encodeABI();

  const tx = await signer.sendTransaction({
    to: SaleNftAddress,
    data: contractABI,
  });
  const receipt = await tx.wait();
  consoleEtherscan(receipt.hash);
  return receipt;
}

export async function transactWithSetOnsaleNfts(signer, nftIds, price) {
  const contractABI = SaleNftContract.methods
    .setOnsaleNfts(nftIds, price, signer.address)
    .encodeABI();

  const tx = await signer.sendTransaction({
    to: SaleNftAddress,
    data: contractABI,
  });
  const receipt = await tx.wait();
  consoleEtherscan(receipt.hash);
  return receipt;
}

export async function transactWithPurchaseNft(signer, nftId, price) {
  const contractABI = SaleNftContract.methods.purchaseNft(nftId).encodeABI();

  const tx = await signer.sendTransaction({
    to: SaleNftAddress,
    data: contractABI,
    value: price,
  });
  const receipt = await tx.wait();
  consoleEtherscan(receipt.hash);
  return receipt;
}

export async function transactWithMintCollection(
  signer,
  nftNameList,
  fileNameList,
  collectionIpfsHash,
  tempIpfsHash,
  remainedSeconds
) {
  const isHide = true;
  const contractABI = MintContract.methods
    .userMintCollection(
      signer.address,
      nftNameList,
      fileNameList,
      collectionIpfsHash,
      isHide,
      tempIpfsHash,
      remainedSeconds
    )
    .encodeABI();

  const tx = await signer.sendTransaction({
    to: MintAddress,
    data: contractABI,
  });
  const receipt = await tx.wait();
  consoleEtherscan(receipt.hash);
  return receipt;
}

export async function transactWithAirdrop(signer, tempTokenUrl) {
  const contractABI = MintContract.methods
    .airdrop(signer.address, tempTokenUrl)
    .encodeABI();

  const tx = await signer.sendTransaction({
    to: MintAddress,
    data: contractABI,
  });
  const receipt = await tx.wait();
  consoleEtherscan(receipt.hash);
  return receipt;
}

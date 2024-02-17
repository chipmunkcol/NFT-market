import { SaleNft } from "./../typechain-types/contracts/SaleNft";
import { ethers } from "hardhat";

async function main() {
  const Mint = await ethers.getContractFactory("Mint");
  const mint = await Mint.deploy();
  console.log("mint: ", mint);

  const SaleNft = await ethers.getContractFactory("SaleNft");
  const saleNft = await SaleNft.deploy(await mint.getAddress());
  console.log("saleNft: ", saleNft);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

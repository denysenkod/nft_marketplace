const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  const NFTMarketplace = await hre.ethers.getContractFactory('NFTMarketplace');
  const nftMarketplace = await NFTMarketplace.deploy();

  //await nftMarketplace.deployed();

  if (!nftMarketplace.address) {
    console.error("Contract deployment failed:", nftMarketplace);
    return;
  }

  console.log("NFTMarketplace deployed to:", nftMarketplace.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
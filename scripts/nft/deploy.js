const hre = require("hardhat");

async function main() {
  const initialOwner = "0x4BF8E1E54E50E3b64E9c486D4230Ee4F9e7dE792"
  const contract = await hre.ethers.deployContract("GenzNft", [initialOwner]);
  await contract.waitForDeployment();
  console.log(`Contract deployed to ${contract.target}`);
}

//DEFAULT BY HARDHAT:
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
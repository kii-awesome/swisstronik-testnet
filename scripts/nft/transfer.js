const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");

const sendShieldedTransaction = async (signer, destination, data, value) => {
  const rpcLink = hre.network.config.url;
  const [encryptedData] = await encryptDataField(rpcLink, data);

  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  const contractAddress = "0x806727b4fedEB2f20e18f6Afd2326b978f5A7dC4";
  const [signer] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory("GenzNft");
  const contract = contractFactory.attach(contractAddress);

  const functionName = "transferFrom";
  // from , to and tokenid
  const functionArgs = ["0x4BF8E1E54E50E3b64E9c486D4230Ee4F9e7dE792", "to_address", "1"];
  const transaction = await sendShieldedTransaction(signer, contractAddress, contract.interface.encodeFunctionData(functionName, functionArgs), 0);

  await transaction.wait();
  console.log("Transaction Response: ", transaction);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
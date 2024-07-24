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

  const functionName = "safeMint";
  const mintTo = ["0x4BF8E1E54E50E3b64E9c486D4230Ee4F9e7dE792"];
  const mintTx = await sendShieldedTransaction(
    signer,
    contractAddress,
    contract.interface.encodeFunctionData(functionName, mintTo),
    0
  );
  await mintTx.wait();

  console.log("Mint Transaction: ", mintTx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
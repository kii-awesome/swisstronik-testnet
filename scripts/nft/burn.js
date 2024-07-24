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
  const contractAddress = "0x56C0f591E575FE4Db82EF9116fc7ab28A660F2B7";
  const [signer] = await hre.ethers.getSigners();

  const contractFactory = await hre.ethers.getContractFactory("GenzToken");
  const contract = contractFactory.attach(contractAddress);

  const functionName = "burn";
  const tokenId = []; // token id
  const burnTx = await sendShieldedTransaction(
    signer,
    contractAddress,
    contract.interface.encodeFunctionData(functionName, tokenId),
    0
  );

  await burnTx.wait();

  console.log("Burn Transaction: ", burnTx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

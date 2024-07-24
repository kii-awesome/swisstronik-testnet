const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");

const sendShieldedQuery = async (provider, destination, data) => {
  const rpcLink = hre.network.config.url;
  const [encryptedData, usedEncryptionKey] = await encryptDataField(
    rpcLink,
    data
  );
  const response = await provider.call({
    to: destination,
    data: encryptedData,
  });

  return await decryptNodeResponse(rpcLink, response, usedEncryptionKey);
};

async function main() {
  const contractAddress = "0x56C0f591E575FE4Db82EF9116fc7ab28A660F2B7";
  const [signer] = await hre.ethers.getSigners();

  const contractFactory = await hre.ethers.getContractFactory("GenzToken");
  const contract = contractFactory.attach(contractAddress);
  const functionName = "decimals";
  const responseMessage = await sendShieldedQuery(
    signer.provider,
    contractAddress,
    contract.interface.encodeFunctionData(functionName)
  );

  // Decode the Uint8Array response into a readable string
  console.log(
    "Decoded response:",
    contract.interface.decodeFunctionResult(functionName, responseMessage)[0]
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

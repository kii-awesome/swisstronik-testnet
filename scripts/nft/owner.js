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
  const contractAddress = "0x806727b4fedEB2f20e18f6Afd2326b978f5A7dC4";
  const [signer] = await hre.ethers.getSigners();

  const contractFactory = await hre.ethers.getContractFactory("GenzNft");
  const contract = contractFactory.attach(contractAddress);
  const functionName = "owner";
  const responseMessage = await sendShieldedQuery(
    signer.provider,
    contractAddress,
    contract.interface.encodeFunctionData(functionName)
  );

  console.log("Decoded response:",contract.interface.decodeFunctionResult(functionName, responseMessage)[0]);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

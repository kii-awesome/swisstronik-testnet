const { vars } = require("hardhat/config");
require("@nomicfoundation/hardhat-toolbox");

const PRIVATE_KEY = vars.get("PRIVATE_KEY")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    swisstronik: {
      url: "https://json-rpc.testnet.swisstronik.com/",
      chainId: 1291,
      accounts: [PRIVATE_KEY] 
    }
  }
};

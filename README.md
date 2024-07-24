# Sample Swisstronik Hardhat

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

```
npm install
```

## Variable Configuration
```
npx hardhat vars set PRIVATE_KEY
```

input your test private key

- get list variable
```
npx hardhat vars list
```

## compile 
```
npx hardhat compile
```

## Deploy

- delpoy Sample  Contract
```
npx hardhat run scripts/simplecontract/deploy.js --network swisstronik
```

- delpoy token
```
npx hardhat run scripts/token/deploy.js --network swisstronik
```

- delpoy nft
```
npx hardhat run scripts/nft/deploy.js --network swisstronik
```



### Sample Contract

- Sample Contract

sample : `0x56A59A6aA6EE3FC26019f28248da21585c94723D`


- Set Value
```
npx hardhat run scripts/simplecontract/setValue.js --network swisstronik
```

- Get Value
```
npx hardhat run scripts/simplecontract/getValue.js --network swisstronik
```


### Token

GenzToken
`0x56C0f591E575FE4Db82EF9116fc7ab28A660F2B7`

- balanceOf
```
npx hardhat run scripts/token/balanceOf.js --network swisstronik
```

- transfer
```
npx hardhat run scripts/token/transfer.js --network swisstronik
```

- Total suply
```
npx hardhat run scripts/token/totalSupply.js --network swisstronik
```

- Symbol
```
npx hardhat run scripts/token/symbol.js --network swisstronik
```

- Balance
```
npx hardhat run scripts/token/balanceOf.js --network swisstronik
```

- Burn
```
npx hardhat run scripts/token/burn.js --network swisstronik
```

- Mint
```
npx hardhat run scripts/token/mint.js --network swisstronik
```

## nft

GenzNFt
`0x806727b4fedEB2f20e18f6Afd2326b978f5A7dC4`

- test
```
npx hardhat run scripts/nft/safeMint.js --network swisstronik
```

- owner by token id
```
npx hardhat run scripts/nft/ownerByTokenId.js --network swisstronik
```
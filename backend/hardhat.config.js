require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY

module.exports = {
    solidity: "0.8.17",
    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            chainId: 5,
            accounts: [PRIVATE_KEY],
        },
        etherscan: {
            apiKey: {
                goerli: "IP3FRBY54DSVCVW1NNJNEK8QQK9S5A8GS3",
            },
        },
    },
}
// 0x70A3cd82bCec9f610ed9F858bAf821dEdE8de5F3

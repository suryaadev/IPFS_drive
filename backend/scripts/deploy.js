const hre = require("hardhat")

async function main() {
    const contractFactory = await hre.ethers.getContractFactory("IPFS_drive")
    const deployContract = await contractFactory.deploy()
    await deployContract.deployed()

    console.log(`Contract Address ::: ${deployContract.address}`)
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })

const { network } = require("hardhat")
const { networkConfig } = require("../helperHardhat")
const { ethers } = require("ethers")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const chain = network.config.chainId
    let arguments = [
        networkConfig[chain]["LendingPool1"],
        networkConfig[chain]["aaveOracle"]
    ]
    log(
        "----------------------------------------------------------------------------"
    )

    await deploy("AaveIntegrationHelper", {
        from: deployer,
        args: arguments,
        log: true,
        //gasLimit: 9000000
    })

    log(
        "----------------------------------deployed aave contract ---------------------------"
    )
}

module.exports.tags = ["all"]

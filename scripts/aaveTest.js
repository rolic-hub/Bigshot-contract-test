const { ethers, deployments, network } = require("hardhat")
const abi = require("../constants/abi.json")
const { networkConfig } = require("../helperHardhat")
const aaveAbi = require("../artifacts/contracts/AaveIntegrationHeler.sol/AaveIntegrationHelper.json")
const {
    impersonateAccount,
} = require("@nomicfoundation/hardhat-network-helpers")

const accountToimpersonate = "0xc58Bb74606b73c5043B75d7Aa25ebe1D5D4E7c72"

async function main() {
    await deployments.fixture(["all"])
    const approveAmount = ethers.utils.parseEther("20")
    const unit = ethers.utils.parseEther("18")
    const chain = network.config.chainId
    const signer = await ethers.getSigner(accountToimpersonate)
    const dai = networkConfig[chain]["daiToken"]
    const weth = networkConfig[chain]["wethToken"]
    const link = networkConfig[chain]["linkToken"]
    const Aavecontract = await ethers.getContract(
        "AaveIntegrationHelper",
        signer
    )

    await approveErc20(Aavecontract.address, weth, approveAmount, signer)
    console.log("Before depositing and borrowing")
    const {
        totalCollateral,
        totalDebt,
        availableBorrow,
        currentLiquidation,
        ltvF,
        healthFactorF,
    } = await Aavecontract.getUserData(Aavecontract.address)

    console.log(
        `TotalCollateralBase - ${totalCollateral},\n totalDebtBase - ${totalDebt},
        \n availableBorrowsBase - ${availableBorrow}, \n currentLiquidationThreshold - ${currentLiquidation},
        \nltv - ${ltvF}, \n healthFactor - ${healthFactorF}`
    )
    await Aavecontract._suppllyCollateralAndBorrow(
        link,
        ethers.utils.parseEther("50"),
        weth,
        ethers.utils.parseEther("15"),
        ethers.utils.parseEther("3")
    )
    console.log(
        `supplied ${ethers.utils.parseEther(
            "18"
        )} worth of weth as collateral and borrowed ${ethers.utils.parseEther(
            "50"
        )} worth of link`
    )
    //console.log(await supplyBorrow.wait(1))
    console.log("After depositing and borrowing")
    const {
        totalCollateralBase,
        totalDebtBase,
        availableBorrowsBase,
        currentLiquidationThreshold,
        ltv,
        healthFactor,
    } = await Aavecontract.getUserData(Aavecontract.address)

    console.log(
        `TotalCollateralBase - ${totalCollateralBase},\n totalDebtBase - ${totalDebtBase},
        \n availableBorrowsBase - ${availableBorrowsBase}, \n currentLiquidationThreshold - ${currentLiquidationThreshold}, \n
        ltv - ${ltv}, \n healthFactor - ${healthFactor}`
    )
    console.log("repaying loan")
    
    await Aavecontract._repayAndWithdrawCollateral(
        link,
        ethers.utils.parseEther("50"),
        weth,
        Aavecontract.address,
        0
    )

    const {
        totalCollateralBas,
        totalDebtBas,
        availableBorrowsBas,
        currentLiquidationThreshol,
        lt,
        healthFacto,
    } = await Aavecontract.getUserData(Aavecontract.address)

    console.log(
        `TotalCollateralBase - ${totalCollateralBas},\n totalDebtBase - ${totalDebtBas},
        \n availableBorrowsBase - ${availableBorrowsBas}, \n currentLiquidationThreshold - ${currentLiquidationThreshol}, \n
        ltv - ${lt}, \n healthFactor - ${healthFacto}`
    )
    // const oracle_price = await Aavecontract.getPrice(
    //     networkConfig[chain]["linkToken"]
    // )
    // console.log(`the price of link Token is ${oracle_price}`)
    // const Woracle_price = await Aavecontract.getPrice(weth)
    // console.log(`the price of weth Token is ${Woracle_price}`)
    // const Doracle_price = await Aavecontract.getPrice(dai)
    // console.log(`the price of dai Token is ${Doracle_price}`)
}

async function depositTest(chain, unitd, approveAmount, signerD) {
    await Aavecontract.depositToken(
        networkConfig[chain]["wethToken"],
        unitd,
        approveAmount
    )
    console.log(`sucessfully deposited ${unitd} into aave `)
    await getBalance(networkConfig[chain]["wethToken"], signerD)
}

async function getBalance(erc20TokenAddress, signer) {
    const erc20Token = await ethers.getContractAt(
        "IERC20",
        erc20TokenAddress,
        signer
    )
    const balance = await erc20Token.balanceOf(accountToimpersonate)
    console.log(`amount of weth is ${balance.toString()}`)
}

async function approveErc20(spenderAddress, erc20TokenAddress, amount, signer) {
    await network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [accountToimpersonate],
    })
    const erc20Token = await ethers.getContractAt(
        "IERC20",
        erc20TokenAddress,
        signer
    )
    const balance = await erc20Token.balanceOf(accountToimpersonate)
    console.log(`amount of weth is ${balance.toString()}`)

    const approval = await erc20Token.approve(spenderAddress, amount)
    await approval.wait(1)
    console.log("Approved")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

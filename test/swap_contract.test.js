const { assert, expect } = require("chai")
const { ethers, network } = require("hardhat")
const {
    abi,
} = require("../artifacts/contracts/AaveIntegrationHeler.sol/AaveIntegrationHelper.json")
const {linkABI} = require("../constants/abi.json")
describe("swap contract test", () => {
    let aave, aaveHelper, conAddress
    // const uniHolder = "0xa29b574fea8d85b6c2a1b7071e6160212cf94097"
    // const uniswapContract = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
    const linkToken = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"
    const usdt = "0xBD21A10F619BE90d6066c941b04e340841F1F989"
   


    beforeEach(async () => {
        // await network.provider.request({
        //     method: "hardhat_impersonateAccount",
        //     params: [uniHolder],
        // })
        aave = await ethers.getContractFactory("AaveIntegrationHelper")
        aaveHelper = await aave.deploy()
        conAddress = aaveHelper.address
    })

    describe("deposit function", () => {
        // let aavewithSigner
        // beforeEach(async () => {
        //     const provider = new ethers.providers.JsonRpcProvider(
        //         "http://127.0.0.1:8545/"
        //     )
        //     const signer = provider.getSigner(uniHolder)
        //     aavewithSigner = new ethers.Contract(conAddress, abi, signer)
        // })

        it("should deposit LINK and update user data", async () => {
            const erc20Token = await ethers.getContractAt(linkABI, linkToken)
            await erc20Token.approve(lendingpool, 11)
            await aaveHelper.depositToken(linkToken, 10)
            const userData = await aaveHelper.getUserData();
            console.log(userData)
        })
    })
})

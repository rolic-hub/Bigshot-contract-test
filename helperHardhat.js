const networkConfig = {
    31337: {
        name: "localhost",
        LendingPool1: "0x794a61358d6845594f94dc1db02a252b5b4814ad",
        wethToken: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
        daiToken: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    },

    80001: {
        name: "polygon mumbai",
        linkToken: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
        LendingPool: "0x1758d4e6f68166C4B2d9d0F049F33dEB399Daa1F",
        LendingPool1: "0x6C9fB0D5bD9429eb9Cd96B85B81d872281771E6B",
        usdt: "0xBD21A10F619BE90d6066c941b04e340841F1F989",
    },
}

module.exports = {
    networkConfig,
}

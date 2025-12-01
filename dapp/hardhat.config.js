require("@nomicfoundation/hardhat-toolbox");

/** @type import("hardhat/config").HardhatUserConfig */
module.exports = {
    solidity: "0.8.20",
    networks: {
        hardhat: {
            chainId: 1337,
        },
        ganache: {
            url: "http://localhost:8545",
            chainId: 1337,
        },
    },
};

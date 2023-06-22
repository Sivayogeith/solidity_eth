require("@nomicfoundation/hardhat-toolbox");
const dotenv = require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: "0.8.20",
	defaultNetwork: "sepolia",
	networks: {
		sepolia: {
			url: process.env.RPC_URL,
			accounts: [process.env.PRIVATE_KEY],
		},
	},

	etherscan: {
		apiKey: process.env.ETHERSCAN_API_KEY,
	},
};

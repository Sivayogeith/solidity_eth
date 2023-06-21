const Web3 = require("web3");
const contractABI = require("../ABIs/Land.json");
const contractAddress = "0xf66135137B05AFfC4995F73e12c3ff3ce7cC03c4";
const web3 = new Web3.Web3("http://localhost:8545");

const contract = new web3.eth.Contract(contractABI, contractAddress, {
	from: "0xc7bD68A6d8B2EF5927b3504Ce7f3aeBC26718f1d",
});
async function getMyDetails() {
	result = await contract.methods.getMyDetails().call();
	console.log("getMyDetails function returns: ", result);
}

async function changeMyDetails() {
	result = await contract.methods
		.changeMyDetails("Yogi Uma", 12, 123456789012)
		.send();
	console.log("changeMyDetails function returns: ", result);
}

getMyDetails();
changeMyDetails();
getMyDetails();

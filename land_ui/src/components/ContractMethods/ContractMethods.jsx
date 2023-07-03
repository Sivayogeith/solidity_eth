import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import MetaMaskOnboarding from "@metamask/onboarding";
import Swal from "sweetalert2";

const onboarding = new MetaMaskOnboarding();
const rpcUrl = import.meta.env.VITE_RPC_URL;
const web3 = new Web3(rpcUrl);

const ContractMethods = (props) => {
	const [methods, setMethods] = useState([]);
	const { contractAddress, ABI: contractABI } = props;
	const contract = new web3.eth.Contract(contractABI, contractAddress);
	const [contractConsole, setContractConsole] = useState([]);
	useEffect(() => {
		const methodList = contractABI.filter(
			(item) => item.type === "function"
		);
		setMethods(methodList);
	}, []);

	const log = (item, error) => {
		console[error ? "error" : "log"](item);
		setContractConsole((oldArray) => [...oldArray, item]);
	};

	const handleMethodSubmit = async (methodName, params, stateMutability) => {
		const provider = await detectEthereumProvider({ mustBeMetaMask: true });

		if (provider) {
			if (!provider.isMetaMask) {
				log("Please use MetaMask!", false);
			}
			try {
				const method = contract.methods[methodName];
				const accounts = await provider.request({
					method: "eth_requestAccounts",
					params: [],
				});
				const account = accounts[0];
				log(`Connected with your account (${account})`, false);

				if (stateMutability === "view") {
					const result = await method(...params).call({
						from: account,
					});
					log("Method result: " + result, false);
				} else {
					const gasEstimate = await method(...params).estimateGas({
						from: account,
					});

					const transaction = {
						from: account,
						to: contractAddress,
						data: method(...params).encodeABI(),
						gas: gasEstimate.toString(),
						value: "0x0",
						maxFeePerGas: "0x5F5E100",
						maxPriorityFeePerGas: "0x5F5E100",
						chainId: "0xaa36a7",
					};

					const result = await provider.request({
						method: "eth_sendTransaction",
						params: [
							{
								...transaction,
								feeMarketBid: {
									maxFeePerGas: transaction.maxFeePerGas,
									maxPriorityFeePerGas:
										transaction.maxPriorityFeePerGas,
								},
							},
						],
					});

					log("Transaction receipt: " + result, false);
				}
			} catch (error) {
				log("Error executing method: " + error, true);
			}
		} else {
			console.log("Please install MetaMask!");
			Swal.fire({
				title: "MetaMask",
				text: "Please install MetaMask Extenstion or App to continue!",
				icon: "error",
			});
			onboarding.startOnboarding();
		}
	};
	return (
		<>
			<div className="card-container">
				{methods.map((method, index) => (
					<div className="row" key={index}>
						<div className="col-md-12">
							<div className="card" key={index}>
								<div className="row">
									<div className="col-md-6 form-item">
										<h3>{method.name}</h3>
										{method.inputs.map(
											(input, inputIndex) => (
												<div key={inputIndex}>
													<label className="form-label">
														{input.name}
													</label>
													<input
														className="form-control"
														type="text"
														id={`method-${index}`}
													/>
												</div>
											)
										)}
									</div>
									<div className="form-item">
										<button
											className="btn btn-dark"
											onClick={() =>
												handleMethodSubmit(
													method.name,
													Array.from(
														document.querySelectorAll(
															`#method-${index}`
														)
													).map(
														(input) => input.value
													),
													method.stateMutability
												)
											}
										>
											Submit
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="form-item">
				<p>Console:</p>
				<div className="card log-card">
					{contractConsole.map((log, index) => (
						<p key={index} className="log">
							{log}
						</p>
					))}
				</div>
				<button
					className="btn btn-dark log-clear-btn"
					onClick={() => {
						setContractConsole([]);
					}}
				>
					Clear
				</button>
			</div>
		</>
	);
};

export default ContractMethods;

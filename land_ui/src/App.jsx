import { useState } from "react";
import "./App.css";
import ContractMethods from "./components/ContractMethods/ContractMethods";

function App() {
	const [ABI, setABI] = useState("");
	const [contractAddress, setContractAddress] = useState("");
	const [showContract, setShowContract] = useState(false);

	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];

		if (selectedFile) {
			const reader = new FileReader();
			reader.onload = handleFileRead;
			reader.readAsText(selectedFile);
		}
	};

	const handleFileRead = (event) => {
		const fileContent = event.target.result;
		setABI(JSON.parse(fileContent));
	};

	return (
		<>
			{showContract ? (
				<>
					<ContractMethods
						contractAddress={contractAddress}
						ABI={ABI}
					></ContractMethods>
				</>
			) : (
				<div className="row">
					<div className="col-md-6 form-item">
						<label htmlFor="contractAddress" className="form-label">
							Please enter the contract address
						</label>
						<input
							type="text"
							className="form-control"
							id="contractAddress"
							placeholder="0x....."
							onChange={(e) => setContractAddress(e.target.value)}
						/>
					</div>
					<div className="col-md-6 form-item">
						<label htmlFor="ABI" className="form-label">
							Please choose the ABI of the contract
						</label>
						<input
							className="form-control"
							type="file"
							id="ABI"
							onChange={handleFileChange}
						/>
					</div>
					<div className="form-item">
						<button
							className="btn btn-dark"
							disabled={!contractAddress || !ABI}
							onClick={() => setShowContract(true)}
						>
							Submit
						</button>
					</div>
				</div>
			)}
		</>
	);
}

export default App;

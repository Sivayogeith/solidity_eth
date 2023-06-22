// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TestLand {
    address public owner;

    constructor() {
        owner = msg.sender; // Assign the deployer's address as the owner
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid new owner address");

        owner = newOwner;
    }

    // Rest of the contract code...
}
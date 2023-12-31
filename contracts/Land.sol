// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract Land {
    address owner;
    address[] allOwners;
    OwnerDetails ownerDetails;

    struct OwnerDetails {
        string fullName;
        uint age;
        uint aadharId;
    }

    struct ShowableOwnerDetails {
        string fullName;
        uint age;
    }

    constructor(string memory fullName, uint age, uint aadharId) {
        owner = msg.sender;
        ownerDetails = OwnerDetails({fullName: fullName, age: age, aadharId: aadharId});
        allOwners.push(owner);
    }


    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function"); 
        _;
    }

    function transferOwnership(string memory fullName, uint age, uint aadharId, address newOwnerId) public onlyOwner {
        require(newOwnerId != address(0), "Invalid new owner address");

        allOwners.push(newOwnerId);

        ownerDetails = OwnerDetails({fullName: fullName, age: age, aadharId: aadharId});
        owner = newOwnerId;
    }

    function getAllOwners() view public onlyOwner returns(address[] memory) {
        return allOwners;
    }

    function getMyDetails() view public onlyOwner returns(OwnerDetails memory) {
        return ownerDetails;
    }

    function changeMyDetails(string memory fullName, uint age, uint aadharId) public onlyOwner{
        ownerDetails = OwnerDetails({fullName: fullName, age: age, aadharId: aadharId});
    }

    function whoIsTheOwner() view public returns(ShowableOwnerDetails memory){
        return ShowableOwnerDetails(ownerDetails.fullName, ownerDetails.age);
    }

}
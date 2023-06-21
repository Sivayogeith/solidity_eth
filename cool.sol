// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract CoolContract {
    bool isYogiABaku = false;

    function whoIsTheBaku() view public returns(string memory) {
        if (isYogiABaku) {
            return "Yogi is a Baku!!!";
        }
        return "Yogi is not a Baku!!! Akkama is the BAKU!!!!";
    }

    function toggleBakus() public{
        if (isYogiABaku) {
            isYogiABaku = false;
        } else {
            isYogiABaku = true;
        }

    }
}
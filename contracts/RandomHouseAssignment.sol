// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "./HogwartsNFT.sol";

contract RandomHouseAssignment {
    HogwartsNFT public nftContract;
    mapping(address => string) private s_nameToSender;
    mapping(address => bool) public hasRequested; // To prevent multiple requests from the same address

    event NftRequested(address requester);
    event NftMinted(address minter, uint256 house);

    constructor(address _nftContract) {
        nftContract = HogwartsNFT(_nftContract);
    }

    function requestNFT(string memory name) public {
        require(!hasRequested[msg.sender], "You have already requested an NFT");
        
        s_nameToSender[msg.sender] = name;
        hasRequested[msg.sender] = true;
        
        // Generate random number
        uint256 randomValue = _getRandomNumber(block.timestamp, msg.sender);
        uint256 house = randomValue % 4; // Generates a value between 0 and 3
        
        // Mint the NFT
        nftContract.mintNFT(msg.sender, house, name);

        emit NftRequested(msg.sender);
        emit NftMinted(msg.sender, house);
    }

    // Custom randomness function
    function _getRandomNumber(uint256 seed, address sender) internal view returns (uint256) {
       return uint256(keccak256(abi.encodePacked(seed, block.timestamp, block.prevrandao, sender)));
    }
}

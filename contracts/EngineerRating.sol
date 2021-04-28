// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SkillNft.sol";
// import "./ChargingSiteNft.sol";

contract EngineerRating {
    struct RatingPair {
        uint32 count;
        uint32 sum;
    }

    constructor(SkillNft _skillNft) {
        skillNft = _skillNft;
    }

    SkillNft skillNft;

    mapping (address => RatingPair) public ratingMap;
    address[] public engineers;

    function addRating(uint32 rating, address client) public {
        uint256 hasSite = skillNft.balanceOf(msg.sender);
        require(hasSite > 0);
        require(rating > 0);
        require(rating <= 5);
        if (ratingMap[client].count == 0) {
            engineers.push(client);
        }
        ratingMap[client] = RatingPair(ratingMap[client].count + 1, ratingMap[client].sum + rating);
    }

    function listClients() public view returns (address[] memory, uint[] memory) {
        uint length = engineers.length;
        uint[] memory result_rating100 = new uint[](length);
        for (uint i = 0; i < engineers.length; i++) {
            result_rating100[i] = ratingMap[engineers[i]].sum * 100 / ratingMap[engineers[i]].count;
        }
        return (engineers, result_rating100);
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import ",/SkillNft.sol";
import "./ChargingSiteNft.sol";

contract ClientRating {
    struct RatingPair {
        uint32 count;
        uint32 sum;
    }

    constructor(ChargingSiteNft _chargingSiteNft) {
        chargingSiteNft = _chargingSiteNft;
    }

    ChargingSiteNft chargingSiteNft;

    mapping (address => RatingPair) public ratingMap;
    address[] public clients;

    function addRating(uint32 rating, address client) public {
        uint256 hasSite = chargingSiteNft.balanceOf(msg.sender);
        require(hasSite > 0);
        require(rating > 0);
        require(rating <= 5);
        if (ratingMap[client].count == 0) {
            clients.push(client);
        }
        ratingMap[client] = RatingPair(ratingMap[client].count + 1, ratingMap[client].sum + rating);
    }

    function listClients() public view returns (address[] memory, uint[] memory) {
        uint length = clients.length;
        uint[] memory result_rating100 = new uint[](length);
        for (uint i = 0; i < clients.length; i++) {
            result_rating100[i] = ratingMap[clients[i]].sum * 100 / ratingMap[clients[i]].count;
        }
        return (clients, result_rating100);
    }
}
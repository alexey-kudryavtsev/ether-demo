
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Auction {
    address[] participants;
    address owner;
    mapping (address => bytes32) public betHashes;
    mapping (address => uint) public bets;
    int status = 0; // positive integer - number of revealed bets, -1 - cancelled by owner, -2 - canceled due to dishonest participant

    modifier onlyParticipants {
        bool isParticipant = false;
        for(uint i = 0; i < participants.length; i++) {
            isParticipant = isParticipant || (msg.sender == participants[i]);
        }
        require(isParticipant);
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    event WinnerSelected(address Winner, uint bet);
    event AuctionCanceled(address Culprit);
    event AuctionCanceledByOwner();

    function addParticipant(address participant) public {
        participants.push(participant);
    }

    function listParticipants() public view returns (address[] memory) {
        return participants;
    }

    function placeBlindBet(bytes32 betHash) public onlyParticipants {
        betHashes[msg.sender] = betHash;
    }

    function revealBet(uint32 bet, uint32 nonce) public onlyParticipants {
        bytes32 storedBetHash = betHashes[msg.sender];
        bytes32 actualBetHash = keccak256(abi.encode(bet * (2 ** 32) + nonce));
        require(status >= 0);
        if (storedBetHash == actualBetHash) {
            status++;
            bets[msg.sender] = bet;
            if (uint(status) == participants.length) {
                address winner = participants[0];
                uint min = bets[winner];
                for(uint i = 1; i < participants.length; i++) {
                    if (bets[participants[i]] < min) {
                        min = bets[participants[i]];
                        winner = participants[i];
                    }
                }
                emit WinnerSelected(winner, min);
            }
        } else {
            status = -2;
            emit AuctionCanceled(msg.sender);
        }

    }

    function cancel() public {
        require(owner == msg.sender);
        status = -1;
        emit AuctionCanceledByOwner();
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./ChargingSiteNft.sol";

contract Auction {

    ChargingSiteNft public chargingSiteNft;

    address[] participants;
    address owner;
    mapping (address => bytes32) public betHashes;
    mapping (address => uint) public bets;
    int public blindBetCount = 0;
    int public status = 0; // positive integer - number of revealed bets, -1 - cancelled by owner, -2 - canceled due to dishonest participant

    address public winner;
    uint public winningBet;

    modifier onlyParticipants {
        bool isParticipant = false;
        for(uint i = 0; i < participants.length; i++) {
            isParticipant = isParticipant || (msg.sender == participants[i]);
        }
        require(isParticipant);
        _;
    }

    constructor(ChargingSiteNft _chargingSiteNft) {
        chargingSiteNft = _chargingSiteNft;
        owner = msg.sender;
    }

    event WinnerSelected(address winner, uint bet);
    event AuctionCanceled(address culprit, bytes32 savedHash, bytes32 actualHash);
    event AuctionCanceledByOwner();

    function addParticipant(address participant) public {
        participants.push(participant);
    }

    function listParticipants() public view returns (address[] memory) {
        return participants;
    }

    function placeBlindBet(bytes32 betHash) public onlyParticipants {
        require(betHashes[msg.sender] == 0);
        require(participants.length > 1);
        betHashes[msg.sender] = betHash;
        blindBetCount ++;
    }

    function revealBet(uint32 bet, uint32 nonce) public onlyParticipants {
        bytes32 storedBetHash = betHashes[msg.sender];
        bytes32 actualBetHash = keccak256(abi.encode(uint(bet) * (2 ** 32) + uint(nonce)));
        require(status >= 0);
        require(bets[msg.sender] == 0);
        if (storedBetHash == actualBetHash) {
            status++;
            bets[msg.sender] = bet;
            if (uint(status) == participants.length) {
                address maybeWinner = participants[0];
                uint min = bets[maybeWinner];
                for(uint i = 1; i < participants.length; i++) {
                    if (bets[participants[i]] < min) {
                        min = bets[participants[i]];
                        maybeWinner = participants[i];
                    }
                }
                winner = maybeWinner;
                winningBet = min;
                chargingSiteNft.mint(winner);
                emit WinnerSelected(winner, min);
            }
        } else {
            status = -2;
            emit AuctionCanceled(msg.sender, storedBetHash, actualBetHash);
        }

    }

    function cancel() public {
        require(owner == msg.sender);
        status = -1;
        emit AuctionCanceledByOwner();
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SkillNft is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping (address => uint) public certIdsByOwner;

    event AwardSkillEvent(uint256 SkillId);

    constructor() ERC721("Skill", "SKL") {}

    function awardSkill(address engineer, string memory tokenURI)
        public
        returns (uint256)
    {
        _tokenIds.increment();
        certIdsByOwner[engineer] = _tokenIds.current();
        uint256 newSkillId = _tokenIds.current();
        _mint(engineer, newSkillId);
        _setTokenURI(newSkillId, tokenURI);
        emit AwardSkillEvent(newSkillId);
        return newSkillId;
    }
}
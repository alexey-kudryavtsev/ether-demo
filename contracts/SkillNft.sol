
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SkillNft is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event AwardSkillEvent(uint256 SkillId);

    constructor() ERC721("Skill", "SKL") {}

    function awardSkill(address player, string memory tokenURI)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newSkillId = _tokenIds.current();
        _mint(player, newSkillId);
        _setTokenURI(newSkillId, tokenURI);
        emit AwardSkillEvent(newSkillId);
        return newSkillId;
    }
}
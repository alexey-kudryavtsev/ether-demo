
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ChargingSiteNft is ERC721URIStorage {
    constructor() ERC721("ChargingSite", "CHS") {}

    function mint(address tokenHolder) public {
        _mint(tokenHolder, 0);
    }
}

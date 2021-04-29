import Web3 from "web3";
import LmsTest from "./contracts/SkillNft.json";
import Auction from "./contracts/Auction.json";
import ChargingSiteRating from "./contracts/ChargingSiteRating.json";
import EngineerRating from "./contracts/EngineerRating.json";
import ChargingSiteNft from "./contracts/ChargingSiteNft.json"


const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://localhost:7545"),
  },
  contracts: [LmsTest, Auction, ChargingSiteRating, EngineerRating, ChargingSiteNft],
  events: {
    SkillNft: ["AwardSkillEvent"] 
  },
};

export default options;

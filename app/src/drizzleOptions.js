import Web3 from "web3";
import LmsTest from "./contracts/SkillNft.json";
import Auction from "./contracts/Auction.json";
import ClientRating from "./contracts/ClientRating.json";
import EngineerRating from "./contracts/EngineerRating.json";


const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://localhost:7545"),
  },
  contracts: [LmsTest, Auction, ClientRating, EngineerRating],
  events: {
    SkillNft: ["AwardSkillEvent"] 
  },
};

export default options;

import Web3 from "web3";
import LmsTest from "./contracts/SkillNft.json";


const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://localhost:7545"),
  },
  contracts: [LmsTest],
  events: {
    SkillNft: ["AwardSkillEvent"] 
  },
};

export default options;

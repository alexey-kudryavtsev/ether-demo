
const SkillNft = artifacts.require("SkillNft");
const ClientRating = artifacts.require("ClientRating");
const ChargingSiteNft = artifacts.require("ChargingSiteNft");
const EngineerRating = artifacts.require("EngineerRating")
const Auction = artifacts.require("Auction")

module.exports = function(deployer) {
  deployer.deploy(SkillNft).then(() => deployer.deploy(EngineerRating, SkillNft.address));
  deployer.deploy(ChargingSiteNft).then(() => deployer.deploy(ClientRating, ChargingSiteNft.address));
  deployer.deploy(Auction);
};

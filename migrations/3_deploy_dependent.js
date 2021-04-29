
const SkillNft = artifacts.require("SkillNft");
const ChargingSiteRating = artifacts.require("ChargingSiteRating");
const ChargingSiteNft = artifacts.require("ChargingSiteNft");
const EngineerRating = artifacts.require("EngineerRating")
const Auction = artifacts.require("Auction")

module.exports = function (deployer) {
    deployer.deploy(EngineerRating, ChargingSiteNft.address)
    deployer.deploy(ChargingSiteRating, SkillNft.address)
    deployer.deploy(Auction, ChargingSiteNft.address)
};

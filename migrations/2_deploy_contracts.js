
const SkillNft = artifacts.require("SkillNft");
const ChargingSiteNft = artifacts.require("ChargingSiteNft");


module.exports = function (deployer) {
  deployer.deploy(SkillNft)
  deployer.deploy(ChargingSiteNft)
};

var HouseAdmin = artifacts.require("./HouseAdmin.sol");

module.exports = function(deployer) {
  deployer.deploy(HouseAdmin);
};

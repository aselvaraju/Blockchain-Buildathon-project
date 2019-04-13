var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var ShieldedPII = artifacts.require("./ShieldedPII.sol");

module.exports = function(deployer) {
    deployer.deploy(SimpleStorage);
    deployer.deploy(ShieldedPII);
};
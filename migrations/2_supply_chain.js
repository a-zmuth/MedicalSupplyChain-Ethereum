const MedicalSupplyChain = artifacts.require('MedicalSupplyChain.sol');

module.exports = function(deployer) {
    deployer.deploy(MedicalSupplyChain);
}
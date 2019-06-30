var Contract = artifacts.require("Contract");

    module.exports = function(deployer) {
        
        deployer.deploy(Contract, "0x7c3b337d892c5329455653A70C9b385eC7ef3410");
    };

// migrating the appropriate contracts
var Verifier = artifacts.require("./Verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
//var baseUri = "https://gateway.pinata.cloud/ipfs/"
var baseUri = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"
const fs = require('fs');

module.exports = function (deployer) {
  console.log("deploying contracts");

  deployer.deploy(Verifier)
    .then(() => {
      console.log("Verifier.address:" + Verifier.address);

      return deployer.deploy(SolnSquareVerifier, "UDCRealSate", "RSM", baseUri, Verifier.address)
        .then(() => {
          console.log("SolnSquareVerifier.address:" + SolnSquareVerifier.address);

          let config = {
            localhost: {
              verifierAddress: Verifier.address,
              mintableAddress: SolnSquareVerifier.address
            }
          }
          fs.writeFileSync(__dirname + '/../../dapp/config.json', JSON.stringify(config, null, '\t'), 'utf-8');
          console.log("config.json" + JSON.stringify(config, null, '\t'));
        });
    });
};

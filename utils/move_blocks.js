const { network } = require("hardhat");

const move_blocks = async (amount) => {
  console.log("Moving blocks...");
  for (let i = 0; i < amount; i++) {
    await network.provider.request({
      method: "evm_mine",
      parms: [],
    });
  }
};

module.exports = { move_blocks };

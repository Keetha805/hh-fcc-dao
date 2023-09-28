const { network } = require("hardhat");

const move_time = async (amount) => {
  await network.provider.send("evm_increaseTime", [amount]);
  console.log("Moved formward ", amount);
};

module.exports = { move_time };

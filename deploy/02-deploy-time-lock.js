const { ethers, network } = require("hardhat");
const { developmentChains, MIN_DELAY } = require("../helper-hardhat.config");
const { verify } = require("../utils/verify");

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deployer } = await getNamedAccounts();
  console.log("deployer: ", deployer);
  const { deploy } = deployments;

  const args = [MIN_DELAY, [], [], deployer];
  const timeLock = await deploy("TimeLock", {
    from: deployer,
    log: true,
    args: args,
    waitConfirmations: network.config.blockConfirmations,
  });

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(timeLock.address, args);
  }
};

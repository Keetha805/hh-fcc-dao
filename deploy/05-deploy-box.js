const { ethers } = require("hardhat");
const { developmentChains } = require("../helper-hardhat.config");
const { verify } = require("../utils/verify");

module.exports = async function ({ getNamedAccounts, deployments, network }) {
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = await deployments;

  const args = [];

  const box = await deploy("Box", {
    from: deployer,
    log: true,
    args: args,
    waitConfirmations: network.config.blockConfirmations,
  });

  const timeLock = await ethers.getContract("TimeLock");
  const boxContract = await ethers.getContract("Box");

  const ownershipTx = await boxContract.transferOwnership(timeLock.address);
  await ownershipTx.wait(1);

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(box.address, args);
  }
  console.log("YOU DUN IT!");
};

const { ethers, network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat.config");
const { verify } = require("../utils/verify");

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deployer } = await getNamedAccounts();
  console.log("deployer: ", deployer);
  const { deploy } = deployments;
  const args = [];
  const governanceToken = await deploy("GovernanceToken", {
    from: deployer,
    log: true,
    args: args,
    waitConfirmations: network.config.blockConfirmations,
  });
  await delegate(governanceToken.address, deployer);
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(governanceToken.address, args);
  }
};

const delegate = async (governanceTokenAddress, delegatedAccount) => {
  const governanceToken = await ethers.getContractAt(
    "GovernanceToken",
    governanceTokenAddress
  );

  const tx = await governanceToken.delegate(delegatedAccount);
  await tx.wait(1);

  console.log(
    `Checkpoints ${await governanceToken.numCheckpoints(delegatedAccount)}`
  );
};

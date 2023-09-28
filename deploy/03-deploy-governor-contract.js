const { ethers, network } = require("hardhat");
const {
  developmentChains,
  MIN_DELAY,
  VOTING_DELAY,
  VOTING_PERIOD,
  QUORUM_PERCENTAGE,
} = require("../helper-hardhat.config");
const { verify } = require("../utils/verify");

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  //   IVotes _token,
  //   TimelockController _timelock,
  //   uint256 _votingDelay,
  //   uint256 _votingPeriod,
  //   uint256 _quorumPercentage

  const governanceToken = await ethers.getContract("GovernanceToken");
  const timeLock = await ethers.getContract("TimeLock");

  const args = [
    governanceToken.address,
    timeLock.address,
    VOTING_DELAY,
    VOTING_PERIOD,
    QUORUM_PERCENTAGE,
  ];

  const governorContract = await deploy("GovernorContract", {
    from: deployer,
    log: true,
    args: args,
    waitConfirmations: network.config.blockConfirmations,
  });

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(governorContract.address, args);
  }
};

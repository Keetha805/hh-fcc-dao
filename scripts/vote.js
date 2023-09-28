const fs = require("fs");
const {
  proposalsFile,
  developmentChains,
  VOTING_PERIOD,
} = require("../helper-hardhat.config");
const { network, ethers } = require("hardhat");
const { move_blocks } = require("../utils/move_blocks");

const index = 0;

const vote = async (index) => {
  const proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf-8"));
  const proposalId = proposals[network.config.chainId][0];

  const governor = await ethers.getContract("GovernorContract");
  //0 against // 1 for // 2 abstain

  const voteWay = 1;
  const reason = " I like a do da cha cha ";

  const voteTxResponse = await governor.castVoteWithReason(
    proposalId,
    voteWay,
    reason
  );
  await voteTxResponse.wait(1);

  if (developmentChains.includes(network.name)) {
    await move_blocks(VOTING_PERIOD);
  }

  console.log("Voted!! Ready to go!");
};

vote(index)
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

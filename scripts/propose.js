const { getNamedAccounts, ethers, network } = require("hardhat");
const {
  FUNC,
  NEW_STORE_VALUE,
  developmentChains,
  VOTING_DELAY,
  PROPOSAL_DESCRIPTION,
  proposalsFile,
} = require("../helper-hardhat.config");
const fs = require("fs");
const { move_blocks } = require("../utils/move_blocks");

async function propose(args, functionToCall, proposalDescription) {
  const governor = await ethers.getContract("GovernorContract");
  const box = await ethers.getContract("Box");

  const encodedFunctionCall = box.interface.encodeFunctionData(
    functionToCall,
    args
  );
  console.log("encodedFunctionCall: ", encodedFunctionCall);

  console.log("Proposing....");
  const proposeTx = await governor.propose(
    [box.address],
    [0],
    [encodedFunctionCall],
    proposalDescription
  );

  const proposalReceipt = await proposeTx.wait(1);

  if (developmentChains.includes(network.name)) {
    await move_blocks(VOTING_DELAY + 1);
  }

  const proposalId = proposalReceipt.events[0].args.proposalId;
  let proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf-8"));

  proposals[network.config.chainId.toString()].push(proposalId.toString());
  fs.writeFileSync(proposalsFile, JSON.stringify(proposals));
}

propose([NEW_STORE_VALUE], FUNC, PROPOSAL_DESCRIPTION)
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

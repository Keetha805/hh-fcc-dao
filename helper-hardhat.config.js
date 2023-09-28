const networkConfig = {
  default: {
    name: "hardhat",
  },
  31337: {
    name: "localhost",
  },
  11155111: {
    name: "sepolia",
  },
  1: {
    name: "mainnet",
  },
};

const developmentChains = ["hardhat", "localhost"];
const VERIFICATION_BLOCK_CONFIRMATIONS = 5;
const MIN_DELAY = 3600;
const VOTING_PERIOD = 5;
const VOTING_DELAY = 1;
const QUORUM_PERCENTAGE = 4;

const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

const NEW_STORE_VALUE = 777;
const FUNC = "store";
const PROPOSAL_DESCRIPTION = "Proposal 777 in the Box";

const proposalsFile = "./proposals.json";
module.exports = {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
  MIN_DELAY,
  VOTING_PERIOD,
  VOTING_DELAY,
  QUORUM_PERCENTAGE,
  ADDRESS_ZERO,
  NEW_STORE_VALUE,
  FUNC,
  PROPOSAL_DESCRIPTION,
  proposalsFile,
};

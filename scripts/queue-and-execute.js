const { ethers, network } = require("hardhat");
const {
  FUNC,
  NEW_STORE_VALUE,
  PROPOSAL_DESCRIPTION,
  developmentChains,
  MIN_DELAY,
} = require("../helper-hardhat.config");
const { move_blocks } = require("../utils/move_blocks");
const { move_time } = require("../utils/move_time");

const queueAndExecute = async () => {
  const args = [NEW_STORE_VALUE];

  const box = await ethers.getContract("Box");

  const encodedFunctionCall = box.interface.encodeFunctionData(FUNC, args);

  const descriptionHash = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(PROPOSAL_DESCRIPTION)
  );

  const governor = await ethers.getContract("GovernorContract");
  console.log("governor: ", governor.address);
  const queueTx = await governor.queue(
    [box.address],
    [0],
    [encodedFunctionCall],
    descriptionHash
  );
  const quequeReceipt = await queueTx.wait(1);
  console.log("quequeReceipt: ", quequeReceipt);

  if (developmentChains.includes(network.name)) {
    await move_time(MIN_DELAY + 1);
    await move_blocks(1);
  }

  console.log("Executing...");
  const executeTx = await governor.execute(
    [box.address],
    [0],
    [encodedFunctionCall],
    descriptionHash
  );
  await executeTx.wait(1);

  const boxNewValue = await box.retrieve();
  console.log("boxNewValue: ", boxNewValue.toString());

  console.log("DONEEE!!!");
};

queueAndExecute()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

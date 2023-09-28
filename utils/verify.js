const { run } = require("hardhat");

const verify = async (contractAddress, args) => {
  console.log("Verifying...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
    console.log("Verified!");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { verify };

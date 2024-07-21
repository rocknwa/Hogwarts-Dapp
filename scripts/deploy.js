// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
/*const hre = require("hardhat");

const vrfCoordinatorV2Address = process.env.VRFaddress;
const subId = process.env.SubId;
const keyHash = process.env.keyHash;
const callbackGasLimit = process.env.gasLimit;

async function main() {
  console.log("Deploying Hogwarts NFT Contract...")

  const HogwartsNFT = await hre.ethers.getContractFactory("HogwartsNFT");
  const hogwartsNFT = await HogwartsNFT.deploy();
  await hogwartsNFT.waitForDeployment();

  const hogwartsAddress = await hogwartsNFT.getAddress();
  console.log("Hogwarts NFT deployed to:", hogwartsAddress);

  console.log("Deploying Random House Assignment Contract...")

  const RandomHouse = await hre.ethers.getContractFactory("RandomHouseAssignment");
  const randomHouse = await RandomHouse.deploy(hogwartsAddress, vrfCoordinatorV2Address, subId, keyHash, callbackGasLimit);
  await randomHouse.waitForDeployment();

  const randomAddress = await randomHouse.getAddress();
  console.log("Random House Assignment deployed to:", randomAddress);

  // Transfer ownership
  console.log("Transferring ownership...");
  await hogwartsNFT.transferOwnership(randomAddress);
  console.log("Ownership transferred");
}

main()
  .then(() => process.exit(0)) // Corrected from process.exit(1) to process.exit(0) for successful exit
  .catch((error) => {
    console.error(error);
    process.exit(1); // Corrected from process.Exit(2) to process.exit(1) for error exit
  });
*/

const hre = require("hardhat");

const vrfCoordinatorV2Address = process.env.VRFaddress;
const subId = process.env.SubId;
const keyHash = process.env.keyHash;
const callbackGasLimit = process.env.gasLimit;

async function main() {

    console.log("Deploying Hogwarts NFT Contract...")

    const HogwartsNFT = await hre.ethers.getContractFactory("HogwartsNFT");
    const hogwartsNFT = await HogwartsNFT.deploy();

    let currentBlock = await hre.ethers.provider.getBlockNumber();
    while (currentBlock + 5 > (await hre.ethers.provider.getBlockNumber())) {}

    const hogwartsAddress = await hogwartsNFT.getAddress();
    console.log("Hogwarts NFT deployed to:", hogwartsAddress);

    console.log("Deploying Random House Assignment Contract...")

    const RandomHouse = await hre.ethers.getContractFactory("RandomHouseAssignment");
    const randomHouse = await RandomHouse.deploy(hogwartsAddress);

    while (currentBlock + 5 > (await hre.ethers.provider.getBlockNumber())) {}

    const randomAddress = await randomHouse.getAddress();
    console.log("Random House Assignment deployed to:", randomAddress);

    //Transfering ownership
    await hogwartsNFT.transferOwnership(randomAddress);
    console.log("Ownership transferred");

  }

  main();

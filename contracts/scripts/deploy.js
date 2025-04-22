const {ethers} = require("hardhat")

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(deployer.address);
    const Verifier = await ethers.getContractFactory("Groth16Verifier");
    const verifier = await Verifier.deploy();
    await verifier.waitForDeployment();
    console.log("Verifier deployed to:", await verifier.getAddress());
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  

//   contract address setelah deploy 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
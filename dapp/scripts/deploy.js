const hre = require("hardhat");

async function main() {
    const Registry = await hre.ethers.getContractFactory("CertificateRegistry");
    const registry = await Registry.deploy();

    await registry.waitForDeployment();

    console.log("CertificateRegistry deployed at:", registry.target);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});

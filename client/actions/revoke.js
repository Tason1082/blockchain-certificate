import { ethers } from "ethers";
import CertificateRegistry from "../../dapp/artifacts/contracts/CertificateRegistry.sol/CertificateRegistry.json" assert { type: "json" };

// Daha önce issue edilmiş certificate ID’sini buraya yaz
const CERTIFICATE_ID = "0xf027ccb4abd46c2f81af60eb5af0e57ebdfa111d2d58f3ef337e00789e2ee389";

// Owner private key (Hardhat default, direkt yazıyoruz)
const OWNER_PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

async function main() {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    const signer = new ethers.Wallet(OWNER_PRIVATE_KEY, provider);

    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const contract = new ethers.Contract(contractAddress, CertificateRegistry.abi, signer);

    console.log("Revoking certificate...");

    try {
        const tx = await contract.revoke(CERTIFICATE_ID);
        await tx.wait();
        console.log("Certificate revoked successfully! Transaction hash:", tx.hash);
    } catch (err) {
        console.error("Hata oluştu:", err.reason || err);
    }
}

main().catch(console.error);




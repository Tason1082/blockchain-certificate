import { ethers, keccak256, toUtf8Bytes } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// ✔ Hardhat node’un birinci hesabı = owner
const owner = new ethers.Wallet(
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", // Hardhat default private key #0
    provider
);

const registry = new ethers.Contract(
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    [
        "function issue(bytes32 id, bytes32 holderHash, string title, string issuer, uint64 expiresAt) external",
    ],
    owner // ← burada signer = owner
);

function generateHolderHash(ogrNo, adSoyad, salt) {
    const payload = `${ogrNo}|${adSoyad.toUpperCase().trim()}|${salt}`;
    return keccak256(toUtf8Bytes(payload));
}

async function main() {
    const ogrNo = "221229037";
    const adSoyad = "Hasan Agaoglu";

    const id = ethers.hexlify(ethers.randomBytes(32));
    const salt = ethers.hexlify(ethers.randomBytes(16));
    const holderHash = generateHolderHash(ogrNo, adSoyad, salt);

    console.log("ID:", id);
    console.log("HolderHash:", holderHash);
    console.log("Salt:", salt);

    const tx = await registry.issue(
        id,
        holderHash,
        "Blockchain Eğitim Sertifikası",
        "Konya Teknik Üniversitesi",
        0
    );

    await tx.wait();
    console.log("\nSertifika başarıyla oluşturuldu!");
}

main().catch(console.error);

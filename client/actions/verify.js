import { ethers, keccak256, toUtf8Bytes } from "ethers";

function generateHolderHash(ogrNo, adSoyad, salt) {
    const payload = `${ogrNo}|${adSoyad.toUpperCase().trim()}|${salt}`;
    return keccak256(toUtf8Bytes(payload));
}

async function main() {
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

    const abi = [
        // ✔ DOĞRU ABI – değiştirildi
        "function verify(bytes32 id, bytes32 holderHash) view returns (bool valid, bool isRevoked, uint64 issuedAt, uint64 expiresAt, string title, string issuer)"
    ];

    const registry = new ethers.Contract(contractAddress, abi, provider);

    // ----- INPUTS -----
    const id = "0xf027ccb4abd46c2f81af60eb5af0e57ebdfa111d2d58f3ef337e00789e2ee389";
    const ogrNo = "221229037";
    const adSoyad = "Hasan Agaoglu";
    const salt = "0xc61dc7a23b8d12517d77cd0daa738e6c";
    // --------------------

    // holderHash üretimi
    const holderHash = generateHolderHash(ogrNo, adSoyad, salt);

    const result = await registry.verify(id, holderHash);

    console.log("\n--- SONUÇ ---");
    console.log("Geçerli mi       :", result.valid);
    console.log("İptal edildi mi  :", result.isRevoked);
    console.log("Veriliş tarihi   :", new Date(Number(result.issuedAt) * 1000));
    console.log("Son kullanma     :", result.expiresAt == 0 ? "Süresiz" : new Date(Number(result.expiresAt) * 1000));
    console.log("Başlık           :", result.title);
    console.log("İhraç eden       :", result.issuer);
}

main().catch(console.error);


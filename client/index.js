import { makeHolderHash } from './hash.js';
import { issue } from './actions/issue.js';
import { verify } from './actions/verify.js';
import { revoke } from './actions/revoke.js';
import { ethers } from 'ethers';

console.log('=== Sertifika CLI ===');

const RPC = process.env.RPC_URL;
const provider = new ethers.JsonRpcProvider(RPC);

// Ganache default account (0)
const signer = new ethers.Wallet(
    '0x59c6995e998f97a5a0044966f0945385d66c4a5b6bb508f8dd07b3d9aaa8f8e6',
    provider
);

// ------------------------------
// ARGÜMAN FORMAT:
// node index.js <komut> <kontrat> <parametreler...>
// ------------------------------

const cmd = process.argv[2];
const registry = process.argv[3];

if (!cmd || !registry) {
    console.log(`
Kullanım:

 Issue:
   node index.js issue <kontrat> <id> <ogrNo> <adSoyad> <salt> <title> <issuer> <expires>

 Verify:
   node index.js verify <kontrat> <id> <ogrNo> <adSoyad> <salt>

 Revoke:
   node index.js revoke <kontrat> <id>
`);
    process.exit(1);
}

// ------------------------------
// ISSUE
// ------------------------------
if (cmd === 'issue') {
    const [id, ogr, name, salt, title, issuer, exp] = process.argv.slice(4);

    const hash = makeHolderHash(ogr, name, salt);

    await issue(registry, provider, signer, {
        id: id,
        holderHash: hash,
        title: title,
        issuer: issuer,
        expiresAt: Number(exp)
    });

    console.log("✔ Sertifika eklendi.");
}

// ------------------------------
// VERIFY
// ------------------------------
else if (cmd === 'verify') {
    const [id, ogr, name, salt] = process.argv.slice(4);

    const hash = makeHolderHash(ogr, name, salt);

    await verify(registry, provider, id, hash);
}

// ------------------------------
// REVOKE
// ------------------------------
else if (cmd === 'revoke') {
    const [id] = process.argv.slice(4);

    await revoke(registry, provider, signer, id);
}

else {
    console.log("❌ Geçersiz komut!");
}

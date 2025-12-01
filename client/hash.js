import { keccak256, toUtf8Bytes } from "ethers";

export function makeHolderHash(ogrNo, adSoyad, salt) {
    const payload = `${ogrNo}:${adSoyad}:${salt}`;
    return keccak256(toUtf8Bytes(payload));
}


import {
    bytesToHex,
    encodePacked,
    hexToBigInt,
    hexToNumber,
    isAddress,
    isHex,
    keccak256,
    maxUint256,
    numberToBytes,
    numberToHex,
} from "viem";

export default async function mineGasForTransaction(
    nonce: string | number,
    gas: string | number,
    from: string
): Promise<bigint> {
    let address = from;
    nonce = isHex(nonce) ? hexToNumber(nonce) : nonce;
    gas = isHex(gas) ? hexToNumber(gas) : gas;

    if (!isAddress(address)) throw new Error("Invalid Address");

    return await _mineFreeGas(gas as number, address, nonce as number);
}

async function _mineFreeGas(
    gasAmount: number,
    address: `0x${string}`,
    nonce: number
): Promise<bigint> {
    let nonceHash = hexToBigInt(keccak256(numberToHex(nonce, { size: 32 })));
    let addressHash = hexToBigInt(
        keccak256(encodePacked(["address"], [address]))
    );
    let nonceAddressXOR = nonceHash ^ addressHash;
    let divConstant = maxUint256;
    let candidate: bigint;

    let iterations = 0;

    while (true) {
        candidate = hexToBigInt(
            bytesToHex(crypto.getRandomValues(new Uint8Array(32)))
        );
        let candidateHash = hexToBigInt(keccak256(numberToBytes(candidate)));
        let resultHash = nonceAddressXOR ^ candidateHash;
        let externalGas = divConstant / resultHash;

        if (externalGas >= gasAmount) {
            break;
        }
        // every 2k iterations, yield to the event loop
        if (iterations++ % 1_000 === 0) {
            await new Promise<void>((resolve) => setTimeout(resolve, 0));
        }
    }

    return BigInt(candidate);
}

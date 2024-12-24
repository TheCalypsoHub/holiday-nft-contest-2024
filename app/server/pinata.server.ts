import { PinataSDK } from "pinata-web3";

const pinataJWT = process.env.PINATA_JWT;
const pinataGatewayURL = process.env.PINATA_GATEWAY_URL;
const pinataIPFSGroup = process.env.PINATA_IPFS_GROUP;

if (!pinataJWT) {
  throw new Error("Missing Pinata JWT");
}

if (!pinataGatewayURL) {
  throw new Error("Missing Pinata URL");
}

if (!pinataIPFSGroup) {
  throw new Error("Missing Pinata IPFS Group");
}

export const pinata = new PinataSDK({
  pinataJwt: pinataJWT,
  pinataGateway: pinataGatewayURL
});

export const ifpsGroup = pinataIPFSGroup;
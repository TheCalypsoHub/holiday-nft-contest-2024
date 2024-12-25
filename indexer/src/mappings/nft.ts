import { log, BigInt } from "@graphprotocol/graph-ts";
import {
  CalypsoHolidayNFT2024,
  Transfer,
} from "../../generated/CalypsoHolidayNFT2024/CalypsoHolidayNFT2024";
import { Token, User } from "../../generated/schema";

// Event handler for the Transfer event
export function handleTransfer(event: Transfer): void {
  let tokenId = event.params.tokenId.toString();

  // Load or create the Token entity
  let token = Token.load(tokenId);
  if (!token) {
    token = new Token(tokenId);
    token.tokenId = event.params.tokenId;
    token.contractAddress = event.address.toHexString();
    token.votes = BigInt.fromU32(0);

    // Fetch the tokenURI using the contract call
    let contract = CalypsoHolidayNFT2024.bind(event.address);
    let tokenURICallResult = contract.try_tokenURI(event.params.tokenId);

    if (!tokenURICallResult.reverted) {
      token.tokenURI = tokenURICallResult.value;
    } else {
      log.warning("tokenURI fetch reverted for tokenId {} on contract {}", [
        tokenId,
        event.address.toHexString(),
      ]);
      token.tokenURI = ""; // Set an empty value if the call reverts
    }
  }

  // Update token owner
  token.owner = event.params.to.toHexString();

  // Save the token
  token.save();

  // Load or create the 'from' User entity
  let fromUser = User.load(event.params.from.toHexString());
  if (!fromUser) {
    fromUser = new User(event.params.from.toHexString());
    fromUser.balance = 0;
  }
  if (
    event.params.from.toHexString() !=
    "0x0000000000000000000000000000000000000000"
  ) {
    fromUser.balance -= 1;
  }
  fromUser.save();

  // Load or create the 'to' User entity
  let toUser = User.load(event.params.to.toHexString());
  if (!toUser) {
    toUser = new User(event.params.to.toHexString());
    toUser.balance = 0;
  }
  toUser.balance += 1;
  toUser.save();
}

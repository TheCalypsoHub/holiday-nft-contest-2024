import { log, BigInt } from "@graphprotocol/graph-ts";
import {
  VoteCast,
  CalypsoHolidayVoting2024,
} from "../../generated/CalypsoHolidayVoting2024/CalypsoHolidayVoting2024";
import { Token } from "../../generated/schema";

export function handleVote(event: VoteCast): void {
  let tokenId = event.params.tokenId.toString();

  let token = Token.load(tokenId);
  if (!token) {
    return;
  }

  token.votes = token.votes.plus(BigInt.fromU32(1));

  token.save();
}

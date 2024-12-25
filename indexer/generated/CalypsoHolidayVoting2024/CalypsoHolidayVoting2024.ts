// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt,
} from "@graphprotocol/graph-ts";

export class VoteCast extends ethereum.Event {
  get params(): VoteCast__Params {
    return new VoteCast__Params(this);
  }
}

export class VoteCast__Params {
  _event: VoteCast;

  constructor(event: VoteCast) {
    this._event = event;
  }

  get voter(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class CalypsoHolidayVoting2024__getTopTokensResult {
  value0: Array<BigInt>;
  value1: Array<BigInt>;

  constructor(value0: Array<BigInt>, value1: Array<BigInt>) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigIntArray(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigIntArray(this.value1));
    return map;
  }

  getTokens(): Array<BigInt> {
    return this.value0;
  }

  getVoteCounts(): Array<BigInt> {
    return this.value1;
  }
}

export class CalypsoHolidayVoting2024 extends ethereum.SmartContract {
  static bind(address: Address): CalypsoHolidayVoting2024 {
    return new CalypsoHolidayVoting2024("CalypsoHolidayVoting2024", address);
  }

  getTopTokens(): CalypsoHolidayVoting2024__getTopTokensResult {
    let result = super.call(
      "getTopTokens",
      "getTopTokens():(uint256[],uint256[])",
      [],
    );

    return new CalypsoHolidayVoting2024__getTopTokensResult(
      result[0].toBigIntArray(),
      result[1].toBigIntArray(),
    );
  }

  try_getTopTokens(): ethereum.CallResult<CalypsoHolidayVoting2024__getTopTokensResult> {
    let result = super.tryCall(
      "getTopTokens",
      "getTopTokens():(uint256[],uint256[])",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new CalypsoHolidayVoting2024__getTopTokensResult(
        value[0].toBigIntArray(),
        value[1].toBigIntArray(),
      ),
    );
  }

  hasVoted(param0: Address): boolean {
    let result = super.call("hasVoted", "hasVoted(address):(bool)", [
      ethereum.Value.fromAddress(param0),
    ]);

    return result[0].toBoolean();
  }

  try_hasVoted(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("hasVoted", "hasVoted(address):(bool)", [
      ethereum.Value.fromAddress(param0),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  nftContract(): Address {
    let result = super.call("nftContract", "nftContract():(address)", []);

    return result[0].toAddress();
  }

  try_nftContract(): ethereum.CallResult<Address> {
    let result = super.tryCall("nftContract", "nftContract():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  topTokens(param0: BigInt): BigInt {
    let result = super.call("topTokens", "topTokens(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(param0),
    ]);

    return result[0].toBigInt();
  }

  try_topTokens(param0: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall("topTokens", "topTokens(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(param0),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  totalVotes(): BigInt {
    let result = super.call("totalVotes", "totalVotes():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalVotes(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("totalVotes", "totalVotes():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  votes(param0: BigInt): BigInt {
    let result = super.call("votes", "votes(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(param0),
    ]);

    return result[0].toBigInt();
  }

  try_votes(param0: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall("votes", "votes(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(param0),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _nftContract(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class VoteCall extends ethereum.Call {
  get inputs(): VoteCall__Inputs {
    return new VoteCall__Inputs(this);
  }

  get outputs(): VoteCall__Outputs {
    return new VoteCall__Outputs(this);
  }
}

export class VoteCall__Inputs {
  _call: VoteCall;

  constructor(call: VoteCall) {
    this._call = call;
  }

  get tokenId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class VoteCall__Outputs {
  _call: VoteCall;

  constructor(call: VoteCall) {
    this._call = call;
  }
}
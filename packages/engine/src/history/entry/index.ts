import { IMPL_EVM } from '../../constants';
import { getImplFromNetworkId } from '../../managers/network';

enum HistoryTxType {
  // Native currency transfer
  NATIVE_CURRENCY_TRANSFER = 'native_transfer',

  // Contract interaction
  TRANSACTION = 'transaction',
  TOKEN_TRANSFER = 'token_transfer',
  APPROVE = 'approve',

  // Offchain activity
  SIGN = 'sign',
}

enum HistoryEntryType {
  Transaction,
  Sign,
}

type HistoryEntryParams = {
  id: string;
  networkId: string;
  accountId: string;
  encodedTx: any;
  rawTx: string;
  type: HistoryEntryType;
};

abstract class HistoryEntry {
  protected readonly params: HistoryEntryParams;

  createdAt: number;

  type: HistoryTxType;

  updatedAt: number;

  // constructor(params: HistoryEntryParams) {
  //   this.params = params;
  //   this.createdAt = Date.now();
  //   this.updatedAt = this.createdAt;
  //   this.type = this.getTxType();
  //   // this.accountId = accountId;
  //   // this.id = id;
  // }


  abstract getTxType(): HistoryTxType;

  abstract parseTx(): any;

  abstract toJson(): string;

  static fromJson(json: string): HistoryEntry {
    return JSON.parse(json) as HistoryEntry;
  }
}

export { HistoryTxType, HistoryEntry };
export type { HistoryEntryParams, HistoryEntryType };

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

enum HistoryTxStatus {
  SIGNED = 'signed',
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
  DROPPED = 'dropped',
}

interface HistoryItemPayload {
  type: 'btc' | 'evm';
}

interface HistoryItemPayloadEVM extends HistoryItemPayload {
  type: 'evm';
  chainId: number;
}

interface HistoryItemPayloadBTC extends HistoryItemPayload {
  type: 'btc';
  chainId: number;
}

interface HistoryItem {
  id: string;
  networkId: string;
  accountId: string;
  rawTx: string;
  type: HistoryTxType;
  status: HistoryTxStatus;
  from: string;
  to: string;
  value: string;
  fee: string;
  message?: string;
  payload: HistoryItemPayloadEVM | HistoryItemPayloadBTC;
}

export type { HistoryItem };
export { HistoryTxType };

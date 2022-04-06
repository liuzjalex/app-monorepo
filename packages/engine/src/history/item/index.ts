import { HistoryEntryStatus } from '../types/history';

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

interface HistoryItemPayload {
  type: 'btc' | 'evm' | 'sign';
}

interface HistoryItemPayloadEVM extends HistoryItemPayload {
  type: 'evm';
  amount: string;

  hash: string;
  nonce: number;
  from: string;
  to: string;
  value: string;
  feeType: number; // 2: EIP-1559
  fee: string;
  gasPrice: string;
  gasLimit: string;
  gasUsed?: number;
}

interface HistoryItemPayloadBTC extends HistoryItemPayload {
  type: 'btc';
  foo: number;
}

interface HistoryItemPayloadSign extends HistoryItemPayload {
  type: 'sign';
  message: string;
}

class HistoryItem {
  id!: string;

  type!: HistoryTxType;

  status!: HistoryEntryStatus;

  rawTx?: string;

  payload!:
    | HistoryItemPayloadEVM
    | HistoryItemPayloadBTC
    | HistoryItemPayloadSign;
}

export { HistoryItem, HistoryTxType };

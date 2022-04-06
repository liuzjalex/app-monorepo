import { HistoryEntry } from '../../types/history';
import { HistoryItem } from '../entry';

type HistoryEntryParams = {
  id: string;
  networkId: string;
  accountId: string;
  type: 'transaction' | 'sign';
  rawTx: string;
  tx?: any;
  extra?: any;
  message?: string;
};

interface HistoryDecoder {
  decode(params: HistoryEntry): HistoryItem;
}

export type { HistoryDecoder };
export type { HistoryEntryParams };

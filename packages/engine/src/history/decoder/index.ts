import { HistoryEntry } from '../../types/history';
import { HistoryItem } from '../entry';

type HistoryDecoderParams = {
  id: string;
  networkId: string;
  type: 'transaction' | 'sign';
  rawTx: string;
  tx?: any;
  extra?: any;
  message?: string;
};

abstract class HistoryDecoder {
  protected readonly params: HistoryDecoderParams;

  constructor(params: HistoryDecoderParams) {
    this.params = params;
  }

  abstract decode(entry: HistoryEntry): HistoryItem;
}

export { HistoryDecoder };
export type { HistoryDecoderParams };

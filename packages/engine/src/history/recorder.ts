import { HistoryDecoder, HistoryDecoderParams } from './decoder';
import { HistoryDecoderFactory } from './decoder/factory';
import { HistoryEntry } from './entry';

class HistoryRecorder {
  static record(params: HistoryDecoderParams) {
    this.checkParams(params);
    const entry = this._createEntry(params);
  }

  static checkParams({ id }: HistoryDecoderParams) {
    const isValidId = /^(\w+--){2}\w+$/.test(id);
    if (!isValidId) {
      throw new Error(
        `HistoryRecorder: Invalid id: ${id}, id format: 'networkId--txId'`,
      );
    }
  }

  private static _createEntry(params: HistoryDecoderParams): HistoryEntry {
    const decoder = HistoryDecoderFactory.decoderWithParams(params);
    return decoder.decode(params);
  }
}

export { HistoryRecorder };
export type { HistoryDecoderParams };

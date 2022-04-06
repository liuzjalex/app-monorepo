import { HistoryDecoder, HistoryEntryParams } from './decoder';
import { HistoryDecoderFactory } from './decoder/factory';
import { HistoryEntry } from './entry';

class HistoryRecorder {
  static record(params: HistoryEntryParams) {
    this.checkParams(params);
    const entry = this._createEntry(params);
  }

  static checkParams({ id }: HistoryEntryParams) {
    const isValidId = /^(\w+--){2}\w+$/.test(id);
    if (!isValidId) {
      throw new Error(
        `HistoryRecorder: Invalid id: ${id}, id format: 'networkId--txId'`,
      );
    }
  }

  private static _createEntry(params: HistoryEntryParams): HistoryEntry {
    const decoder = HistoryDecoderFactory.decoderWithNetworkId(
      params.networkId,
    );
    return decoder.decode(params);
  }
}

export { HistoryRecorder };
export type { HistoryEntryParams };

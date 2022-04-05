import { HistoryEntry, HistoryTxType } from '.';

class EVMHistoryEntry extends HistoryEntry {
  override getTxType() {
    return HistoryTxType.SIGN;
  }
}

export { EVMHistoryEntry };

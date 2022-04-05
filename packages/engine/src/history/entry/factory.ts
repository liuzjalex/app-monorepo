import { HistoryEntry, HistoryEntryParams } from '.';

import { IMPL_EVM } from '../../constants';
import { getImplFromNetworkId } from '../../managers/network';

import { EVMHistoryEntry } from './evm';

class HistoryEntryFactory {
  static entryWithParams(params: HistoryEntryParams): HistoryEntry {
    const { networkId } = params;
    const impl = getImplFromNetworkId(networkId);

    let entry: HistoryEntry;

    switch (impl) {
      case IMPL_EVM: {
        entry = new EVMHistoryEntry(params);
        entry.createdAt = Date.now();
        break;
      }

      default: {
        throw new Error(
          `HistoryEntryFactory: Network: ${networkId} not supported`,
        );
      }
    }

    return entry;
  }
}

export { HistoryEntryFactory };

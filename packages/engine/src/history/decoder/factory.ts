import { HistoryDecoder } from '.';

import { IMPL_EVM } from '../../constants';
import { getImplFromNetworkId } from '../../managers/network';

import { EVMHistoryDecoder } from './evm';

class HistoryDecoderFactory {
  static decoderWithNetworkId(networkId: string): HistoryDecoder {
    const impl = getImplFromNetworkId(networkId);

    let deocder: HistoryDecoder;

    switch (impl) {
      case IMPL_EVM: {
        deocder = new EVMHistoryDecoder();
        break;
      }

      default: {
        throw new Error(
          `HistoryDecoderFactory: Network: ${networkId} not supported`,
        );
      }
    }

    return deocder;
  }
}

export { HistoryDecoderFactory };

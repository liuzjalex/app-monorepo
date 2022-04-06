import { HistoryDecoder, HistoryDecoderParams } from '.';

import { IMPL_EVM } from '../../constants';
import { getImplFromNetworkId } from '../../managers/network';

import { EVMHistoryDecoder } from './evm/evm';

class HistoryDecoderFactory {
  static decoderWithParams(params: HistoryDecoderParams): HistoryDecoder {
    const { networkId } = params;
    const impl = getImplFromNetworkId(networkId);

    let deocder: HistoryDecoder;

    switch (impl) {
      case IMPL_EVM: {
        deocder = new EVMHistoryDecoder(params);
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

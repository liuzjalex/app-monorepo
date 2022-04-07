import { ethers } from '@onekeyfe/blockchain-libs';

import { HistoryDecoder } from '..';
import {
  HistoryEntry,
  HistoryEntryTransaction,
  HistoryEntryType,
} from '../../../types/history';
import { HistoryItem, HistoryTxType } from '../../entry';

class EVMHistoryDecoder extends HistoryDecoder {
  decode(entry: HistoryEntry): HistoryItem {
    const txHistory = entry as HistoryEntryTransaction;
    this.parseTxHistory(txHistory);
    throw new Error('Method not implemented.');
  }

  private parseTxHistory(txHistory: HistoryEntryTransaction): HistoryItem {
    const { type, contract, id, rawTx, status } = txHistory;
    const tx = ethers.utils.parseTransaction(rawTx);

    const historyItem = new HistoryItem();
    historyItem.type = HistoryTxType.TRANSACTION;
    historyItem.id = id;
    historyItem.status = status;
    historyItem.rawTx = rawTx;

    if (type === HistoryEntryType.TRANSFER) {
      if (contract.length !== 0) {
        historyItem.type = HistoryTxType.NATIVE_CURRENCY_TRANSFER;
      } else {
        historyItem.type = HistoryTxType.TOKEN_TRANSFER;
      }
    }

    return historyItem;
  }

  static HistoryItemPayloadEVMFromTx(
    tx: ethers.Transaction,
  ): HistoryItemPayloadEVM {
    const {
      hash,
      nonce,
      from,
      to,
      value,
      type,
      fee,
      gasPrice,
      gasLimit,
    } = tx;

    return {
      type: 'evm',
      hash,
      nonce,
      from,
      to,
      value,
      feeType: type,
      fee,
      gasPrice,
      gasLimit,
    };
  }

  private static fillItemBuilder(
    tx: ethers.Transaction,
    itemBuilder: EVMDecodedItem,
  ) {
    const { gasLimit, gasPrice, nonce, value, from, to, hash, type, chainId } =
      tx;

    itemBuilder.hash = hash;
    itemBuilder.nonce = nonce;
    itemBuilder.from = from;
    itemBuilder.to = to;
    itemBuilder.value = value.toString();
    itemBuilder.gasPrice = gasPrice?.toString();
    itemBuilder.gasLimit = gasLimit.toString();
    itemBuilder.feeType = type;
    itemBuilder.chainId = chainId;

    itemBuilder.amount = ethers.utils.formatEther(value);
  }
  
  static parseTxType(tx: ethers.Transaction): HistoryTxType {
    const { gasLimit, data } = tx;

    if (data === '0x') {
      // entry.type =
      return HistoryTxType.NATIVE_CURRENCY_TRANSFER;
    }

    try {
      const erc20Iface = new ethers.utils.Interface(ABI.ERC20);
      const tx2 = erc20Iface.parseTransaction(tx);
    } catch (error) {
      console.error(error);
    }

    return HistoryTxType.TRANSACTION;
  }
}

export { EVMHistoryDecoder };

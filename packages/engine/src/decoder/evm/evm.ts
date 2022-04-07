import { ethers } from '@onekeyfe/blockchain-libs';

import { ABI } from './abi';

enum EVMTxType {
  // Native currency transfer
  NATIVE_CURRENCY_TRANSFER = 'native_transfer',

  // Contract interaction
  TRANSACTION = 'transaction',
  TOKEN_TRANSFER = 'token_transfer',
  APPROVE = 'approve',
}

interface EVMDecodedItem {
  txType: EVMTxType;
  tx: ethers.Transaction;
  txDesc?: ethers.utils.TransactionDescription;

  parse?: (a: number) => any;
}

class EVMTxDecoder {
  static decode(rawTx: string): EVMDecodedItem {
    const itemBuilder = {} as EVMDecodedItem;

    const tx = ethers.utils.parseTransaction(rawTx);
    itemBuilder.tx = tx;
    const { data } = tx;

    if (data === '0x') {
      itemBuilder.txType = EVMTxType.NATIVE_CURRENCY_TRANSFER;
      return itemBuilder;
    }

    const [erc20TxDesc, erc20TxType] = this.parseERC20(tx);
    if (erc20TxDesc) {
      itemBuilder.txDesc = erc20TxDesc;
      itemBuilder.txType = erc20TxType;
      return itemBuilder;
    }

    itemBuilder.txType = EVMTxType.TRANSACTION;
    itemBuilder.parse = this.parse.bind(itemBuilder);
    return itemBuilder;
  }

  static parse(a: number): any {
    return a;
  }

  private static parseERC20(
    tx: ethers.Transaction,
  ): [ethers.utils.TransactionDescription | null, EVMTxType] {
    const erc20Iface = new ethers.utils.Interface(ABI.ERC20);

    let txDesc: ethers.utils.TransactionDescription | null;
    let txType = EVMTxType.TRANSACTION;

    try {
      txDesc = erc20Iface.parseTransaction(tx);
    } catch (error) {
      return [null, txType];
    }

    txType =
      {
        'transfer': EVMTxType.TOKEN_TRANSFER,
        'approve': EVMTxType.APPROVE,
      }[txDesc.name] ?? EVMTxType.TRANSACTION;

    return [txDesc, txType];
  }
}

export { EVMTxDecoder };

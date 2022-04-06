import { HistoryDecoder } from '.';

import { ethers } from '@onekeyfe/blockchain-libs';

import { HistoryEntry } from '../../types/history';
import { HistoryItem, HistoryTxType } from '../entry';

const ERC20 = [
  'function name() public view returns (string)',
  'function symbol() public view returns (string)',
  'function decimals() public view returns (uint8)',
  'function totalSupply() public view returns (uint256)',
  'function balanceOf(address _owner) public view returns (uint256 balance)',
  'function transfer(address _to, uint256 _value) public returns (bool success)',
  'function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)',
  'function approve(address _spender, uint256 _value) public returns (bool success)',
  'function allowance(address _owner, address _spender) public view returns (uint256 remaining)',
  'event Transfer(address indexed _from, address indexed _to, uint256 _value)',
  'event Approval(address indexed _owner, address indexed _spender, uint256 _value)',
];

const ABI = {
  ERC20,
};

class EVMHistoryDecoder implements HistoryDecoder {
  decode(params: HistoryEntry): HistoryItem {
    const { rawTx } = params;
    const tx = ethers.utils.parseTransaction(rawTx);
    // const data = tx.data;
    throw new Error('Method not implemented.');
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

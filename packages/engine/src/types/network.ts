import type { IVaultSettings } from '../vaults/types';
import type { HasName } from './base';

type NetworkBase = HasName & {
  impl: string;
  symbol: string;
  logoURI: string;
  enabled: boolean;
  feeSymbol: string;
  decimals: number;
  feeDecimals: number;
  balance2FeeDecimals: number;
};

type PresetNetwork = NetworkBase & {
  chainId?: string;
  shortName: string;
  isTestnet?: boolean;
  presetRpcURLs: Array<string>;
  rpcURLs?: Array<Record<string, string>>;
  prices?: Array<Record<string, any>>;
  explorers?: Array<Record<string, any>>;
  extensions?: Record<string, any>;
};

type DBNetwork = NetworkBase & {
  rpcURL: string;
  position: number;
  curve?: string;
  explorerURL?: string;
};

type EvmExtraInfo = {
  chainId: string;
  networkVersion: string;
};

type AccountNameInfo = {
  prefix: string;
  category: string;
};

type BlockExplorer = {
  name: string;
  address: string;
  block: string;
  transaction: string;
};

type Network = NetworkBase & {
  rpcURL: string;
  shortName: string;
  preset: boolean;
  isTestnet: boolean;
  // UI specific properties.
  // TODO: move this into remote config?
  nativeDisplayDecimals: number;
  tokenDisplayDecimals: number;
  // extra info for dapp interactions
  extraInfo: EvmExtraInfo | Record<string, any>;
  // extra info for building up account name
  accountNameInfo: Record<string, AccountNameInfo>;
  // TODO: rpcURLs
  blockExplorerURL: BlockExplorer;
  settings: IVaultSettings;
};

type AddEVMNetworkParams = {
  name: string;
  symbol?: string;
  rpcURL: string;
  explorerURL?: string;
};

type AddNetworkParams = AddEVMNetworkParams;

type UpdateEVMNetworkParams = {
  name?: string;
  symbol?: string;
  rpcURL?: string;
  explorerURL?: string;
};

type UpdateNetworkParams = UpdateEVMNetworkParams;

type EIP1559Fee = {
  baseFee: string;
  maxPriorityFeePerGas: string;
  maxFeePerGas: string;
};

export type {
  DBNetwork,
  PresetNetwork,
  Network,
  EvmExtraInfo,
  AccountNameInfo,
  BlockExplorer,
  AddEVMNetworkParams,
  AddNetworkParams,
  UpdateNetworkParams,
  EIP1559Fee,
};

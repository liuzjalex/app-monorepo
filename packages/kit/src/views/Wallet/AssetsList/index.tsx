import React, { useCallback, useState } from 'react';

import { useNavigation } from '@react-navigation/core';
import { useIntl } from 'react-intl';
import { Tabs } from 'react-native-collapsible-tab-view';

import {
  Box,
  Divider,
  Icon,
  Pressable,
  ScrollableFlatListProps,
  Text,
  Token,
  Typography,
  useUserDevice,
} from '@onekeyhq/components';
import {
  ManageTokenModalRoutes,
  ManageTokenRoutesParams,
} from '@onekeyhq/kit/src/routes/Modal/ManageToken';

import useInterval from '../../../hooks/useInterval';
import { updateTotalBalance } from '../../../store/reducers/account';
import { AssetToken, WalletAsset } from '../../../types/WalletAsset';
import {
  calculateTotalAmount,
  loadAssets,
  loadAssetsAmount,
  loadAssetsFiatAmount,
} from '../temp/AccountManager';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProps = NativeStackNavigationProp<
  ManageTokenRoutesParams,
  ManageTokenModalRoutes.ListTokensModal
>;

const AssetsList = () => {
  const navigation = useNavigation<NavigationProps>();
  const { size } = useUserDevice();
  const intl = useIntl();

  const [assets, setAssets] = useState<WalletAsset[]>();

  const refreshAssets = useCallback((lodAssets: WalletAsset[] = []) => {
    const accountId =
      'watching--60--0x354245fe78bb274cb560521249ff4e79290144a5';
    const networkId = 'evm--1-1';

    // obtain cache
    const cachePrice = new Map<string, string>();
    const cacheFiatPrice = new Map<string, string>();
    lodAssets?.forEach((element) => {
      cachePrice.set(element.id, element.amount);
      cacheFiatPrice.set(element.id, element.fiatAmount);
    });

    loadAssets(accountId, networkId)
      .then((accountAssets) => {
        accountAssets?.map((element) => {
          element.amount = cachePrice.get(element.id) ?? element.amount;
          element.fiatAmount =
            cacheFiatPrice.get(element.id) ?? element.fiatAmount;
          return element;
        });

        setAssets(accountAssets);
        return Object.assign<WalletAsset[], WalletAsset[]>([], accountAssets);
      })
      .then(async (accountAssets) => {
        await loadAssetsAmount(accountId, networkId, accountAssets);
        loadAssetsFiatAmount(networkId, accountAssets);

        setAssets(accountAssets);

        const totalAmount = calculateTotalAmount(accountAssets);
        updateTotalBalance({
          total: totalAmount.totalAmount.toString(),
          unit: accountAssets[0].symbol ?? '',
          fiatTotal: totalAmount.totalFiat.toString(),
        });
      });
  }, []);

  useInterval(() => {
    refreshAssets(assets);
  }, 8000);

  const renderItem: ScrollableFlatListProps<WalletAsset>['renderItem'] = ({
    item,
    index,
  }) => (
    <Pressable.Item
      p={4}
      borderTopRadius={index === 0 ? '12px' : '0px'}
      borderRadius={index === (assets?.length ?? 0) - 1 ? '12px' : '0px'}
      onPress={() => {
        console.log('Click Token : ', item.address);
      }}
    >
      <Box w="100%" flexDirection="row" alignItems="center">
        <Token
          size={8}
          address={item.address}
          chain={item.chainId.toString()}
          src={item.logoURI}
        />
        <Box ml={3} mr={3} flexDirection="column" flex={1}>
          <Text typography={{ sm: 'Body1Strong', md: 'Body2Strong' }}>
            {`${item.amount} ${item.symbol}`}
          </Text>

          <Typography.Body2 color="text-subdued">
            {`${item.fiatAmount} ${item.fiatUnit}`}
          </Typography.Body2>
        </Box>
        {['LARGE', 'XLARGE'].includes(size) && (
          <Box ml={3} mr={20} flexDirection="row" flex={1}>
            <Icon size={20} name="ActivityOutline" />
            <Typography.Body2Strong ml={3}>
              {item.fiatAmount}
            </Typography.Body2Strong>
          </Box>
        )}
        <Icon size={20} name="ChevronRightSolid" />
      </Box>
    </Pressable.Item>
  );

  return (
    <Tabs.FlatList
      contentContainerStyle={{ paddingHorizontal: 16, marginTop: 16 }}
      data={assets}
      renderItem={renderItem}
      ListHeaderComponent={() => (
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          pb={4}
        >
          <Typography.Heading>
            {intl.formatMessage({ id: 'asset__tokens' })}
          </Typography.Heading>
          <Pressable
            p={1.5}
            onPress={() =>
              navigation.navigate(ManageTokenModalRoutes.ListTokensModal)
            }
          >
            <Icon size={20} name="AdjustmentsSolid" />
          </Pressable>
        </Box>
      )}
      ItemSeparatorComponent={Divider}
      ListFooterComponent={() => <Box h="20px" />}
      keyExtractor={(item: AssetToken, index: number) =>
        `${index}${item.id}${item.amount}${item.fiatAmount}${item.logoURI}`
      }
      extraData={size}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default AssetsList;

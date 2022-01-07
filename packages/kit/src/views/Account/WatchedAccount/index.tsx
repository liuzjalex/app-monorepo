import React, { FC, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/core';
import { useIntl } from 'react-intl';

import { Box, Button, Form, Modal, useForm } from '@onekeyhq/components';
import { SelectItem } from '@onekeyhq/components/src/Select';
import {
  CreateAccountModalRoutes,
  CreateAccountRoutesParams,
  ModalRoutes,
} from '@onekeyhq/kit/src/routes';

import engine from '../../../engine/EngineProvider';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProps = NativeStackNavigationProp<
  CreateAccountRoutesParams,
  CreateAccountModalRoutes.RecoveryAccountForm
>;
type PrivateKeyFormValues = {
  network: string;
  name: string;
  address: string;
};

const WatchedAccount: FC = () => {
  const intl = useIntl();
  const { control, handleSubmit } = useForm<PrivateKeyFormValues>();
  const navigation = useNavigation<NavigationProps>();
  const [networkOptions, setNetworkOptions] = useState<SelectItem[]>([]);

  const loadNetWork = async () => {
    const tempNetworkOptions: SelectItem[] = [];

    const chainNetworks = await engine.listNetworks();
    chainNetworks.forEach((chains, key) => {
      tempNetworkOptions.push({
        label: key.toUpperCase(),
        value: key,
      });
    });

    setNetworkOptions(tempNetworkOptions);
  };

  const onSubmit = (data: PrivateKeyFormValues) => {
    console.log(data);
    engine
      .addWatchingAccount(
        data.network ?? 'evm',
        data.address ?? 0x3b484b82567a09e2588a13d54d032153f0c0aee0,
        data.name ?? 'test01',
      )
      .then((account) => {
        console.log('添加账户成功', JSON.stringify(account));
      })
      .catch((e) => {
        console.log('添加账户失败', e);
      });
  };

  useEffect(() => {
    loadNetWork();
  }, []);

  return (
    <Modal
      header={intl.formatMessage({ id: 'action__add_account' })}
      headerDescription={intl.formatMessage({ id: 'wallet__watched_accounts' })}
      primaryActionTranslationId="action__import"
      onPrimaryActionPress={() =>
        navigation.navigate(ModalRoutes.RecoveryAccountForm)
      }
      hideSecondaryAction
      scrollViewProps={{
        children: (
          <Box
            w="full"
            zIndex={999}
            display="flex"
            flex="1"
            flexDirection="row"
            justifyContent="center"
          >
            <Form w="full">
              <Form.Item
                name="network"
                control={control}
                label={intl.formatMessage({ id: 'network__network' })}
                helpText={intl.formatMessage({
                  id: 'form__network_helperText',
                })}
                defaultValue="evm"
                formControlProps={{ zIndex: 10 }}
              >
                <Form.Select
                  title={intl.formatMessage({ id: 'network__network' })}
                  footer={null}
                  containerProps={{
                    zIndex: 999,
                    padding: 0,
                  }}
                  triggerProps={{
                    py: 2,
                  }}
                  options={networkOptions}
                />
              </Form.Item>
              <Form.Item
                name="name"
                label={intl.formatMessage({ id: 'form__account_name' })}
                control={control}
              >
                <Form.Input />
              </Form.Item>
              <Form.Item
                name="address"
                label={intl.formatMessage({ id: 'form__address' })}
                control={control}
                helpText={intl.formatMessage({
                  id: 'form__address_helperText',
                })}
              >
                <Form.Textarea />
              </Form.Item>
              <Button onPress={handleSubmit(onSubmit)} type="primary">
                {intl.formatMessage({
                  id: 'action__import',
                })}
              </Button>
            </Form>
          </Box>
        ),
      }}
    />
  );
};

export default WatchedAccount;

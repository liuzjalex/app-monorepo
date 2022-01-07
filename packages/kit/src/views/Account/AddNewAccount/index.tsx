/* eslint-disable @typescript-eslint/no-shadow */
import React, { FC, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/core';
import { useIntl } from 'react-intl';

import { Box, Form, Modal, Typography, useForm } from '@onekeyhq/components';
import { SelectItem } from '@onekeyhq/components/src/Select';
import {
  CreateAccountModalRoutes,
  CreateAccountRoutesParams,
  ModalRoutes,
} from '@onekeyhq/kit/src/routes';

import engine from '../../../engine/EngineProvider';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type PrivateKeyFormValues = {
  network: string;
  name: string;
};

type CreateAccountProps = {
  onClose: () => void;
};

type NavigationProps = NativeStackNavigationProp<
  CreateAccountRoutesParams,
  CreateAccountModalRoutes.RecoveryAccountForm
>;

const CreateAccount: FC<CreateAccountProps> = ({ onClose }) => {
  const intl = useIntl();
  const { control } = useForm<PrivateKeyFormValues>();
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

  useEffect(() => {
    loadNetWork();
  }, []);

  return (
    <Modal
      header={intl.formatMessage({ id: 'action__add_account' })}
      headerDescription={`${intl.formatMessage({ id: 'wallet__wallet' })}#2`}
      onClose={onClose}
      primaryActionTranslationId="action__create"
      hideSecondaryAction
      scrollViewProps={{
        children: (
          <>
            <Box
              w="full"
              display="flex"
              flexDirection="row"
              justifyContent="center"
              zIndex={999}
            >
              <Form w="full" zIndex={999}>
                <Form.Item
                  name="network"
                  control={control}
                  label={intl.formatMessage({ id: 'network__network' })}
                  helpText={intl.formatMessage({
                    id: 'form__network_helperText',
                  })}
                  defaultValue="https://rpc.onekey.so/eth"
                  formControlProps={{ zIndex: 999 }}
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
              </Form>
            </Box>
            <Box alignItems="center" mt="6">
              <Typography.Body1>
                {intl.formatMessage({
                  id: 'account__restore_a_previously_used_account',
                })}
              </Typography.Body1>
              <Typography.Body1
                onPress={() =>
                  navigation.navigate(ModalRoutes.RecoveryAccountForm)
                }
              >
                {intl.formatMessage({
                  id: 'action__recover_accounts',
                })}
              </Typography.Body1>
            </Box>
          </>
        ),
      }}
    />
  );
};

export default CreateAccount;

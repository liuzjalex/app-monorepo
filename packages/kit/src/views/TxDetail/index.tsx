import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { Modal, Text } from '@onekeyhq/components';

import HeaderIcon from './HeaderIcon';

const TxDetail: FC = () => (
  <Modal>
    <HeaderIcon networkIdOrStatus="evm--1" />
    <Text>HIIII{}</Text>
  </Modal>
);

export default TxDetail;

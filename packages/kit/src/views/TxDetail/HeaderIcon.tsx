/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { Box, Center, Icon, Image, Typography } from '@onekeyhq/components';
import { Network } from '@onekeyhq/engine/src/types/network';

const getHeaderInfo = (networkIdOrStatus: string, isStatus?: boolean) => {

}



const HeaderIcon: FC<{
  networkOrStatus: string | Network;
}> = ({ networkOrStatus }) => {
  const { isStatus }
}(
  <Center>
    <Center rounded="full" size="56px" bgColor="text-success">
      {isStatus ? <Icon color="icon-success" name="CheckCircleOutline" /> :     <Image
      src="https://app.anchorprotocol.com/assets/ust.7fef9ca5.svg"
      width="56px"
      height="56px"
      borderRadius="full"
    />}
    </Center>
    <Typography.Heading mt={2} color="icon-success">
      CheckCircleOutline
    </Typography.Heading>
  </Center>
);

export default HeaderIcon;

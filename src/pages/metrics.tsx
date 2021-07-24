import { Flex, StackItem, Text } from '@chakra-ui/react';

import { setupAPIClient } from '../service/api';
import { withSSRAuth } from '../utils/withSSRAuth';

export default function Metrics() {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <StackItem experimental_spaceY={4}>
        <Text>Métricas</Text>
      </StackItem>
    </Flex>
  );
}

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/me');

    console.log(response.data);

    return {
      props: {},
    };
  },
  {
    permissions: ['metrics.list'],
    roles: ['administrator'],
  }
);

import { useContext, useEffect } from 'react';
import { Flex, StackItem, Text } from '@chakra-ui/react';

import { AuthContext } from '../contexts/AuthContext';
import { setupAPIClient } from '../service/api';
import { api } from '../service/apiClient';
import { withSSRAuth } from '../utils/withSSRAuth';
import { useCan } from '../hooks/useCan';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const userCanSeeMetrics = useCan({
    roles: ['administrator', 'editor'],
  });

  useEffect(() => {
    api.get('/me').then((response) => console.log(response));
  }, []);

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <StackItem experimental_spaceY={4}>
        <Text>Dashboard</Text>
        <Text>{user?.email}</Text>
        {userCanSeeMetrics && <Text>Pode ver Métricas</Text>}
      </StackItem>
    </Flex>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/me');

  console.log(response.data);

  return {
    props: {},
  };
});

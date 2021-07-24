import { useContext, useEffect } from 'react';
import { Flex, StackItem, Text, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';

import { AuthContext } from '../contexts/AuthContext';
import { setupAPIClient } from '../service/api';
import { api } from '../service/apiClient';
import { withSSRAuth } from '../utils/withSSRAuth';
import { useCan } from '../hooks/useCan';
import { Can } from '../components/Can';

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
        {userCanSeeMetrics && (
          <StackItem border="1px" padding={2}>
            <Text>Pode ver Métricas</Text>

            <Link href="/metrics" passHref>
              <ChakraLink>
                <Text>Ir Métricas</Text>
              </ChakraLink>
            </Link>
          </StackItem>
        )}
        <Can permissions={['metrics.list']}>
          <Text>Pode ver Componente</Text>
        </Can>
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

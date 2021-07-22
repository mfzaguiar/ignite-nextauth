import { Flex, StackItem, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <StackItem>
        <Text>Dashboard</Text>
        <Text>{user?.email}</Text>
      </StackItem>
    </Flex>
  );
}

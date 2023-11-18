import React from 'react'
import { Container, Header } from '../view/styles';
import Flex from '@/components/templates/flex';
import Text from '@/components/atoms/text';

function Payment() {
	return (
    <Container>
      <Header>
        <Flex direction="column" gap="10px">
          <Text weight={600} type="h3" text="Payment Details"></Text>
          <Text
            type="p"
            text="Your personal information secured with us."
          ></Text>
        </Flex>
      </Header>
    </Container>
  );
}

export default Payment
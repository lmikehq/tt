import Text from "@atom/text";
import Div from "src/components/molecules/section";
import { styled } from "styled-components";

interface VisaApplicationTypeTileProps {
  title: string;
  subTitle: string;
  fee: string;
}

const Container = styled.div`
  height: 115px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3fafd;
  padding: 0 24px;
  border: solid 1px #7bbbd6;
  border-radius: 8px;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
`;
const Column = styled.div`
  width: 100%;
  flex-grow: 1;
`;
const VisaApplicationTypeTile = ({
  title,
  subTitle,
  fee,
}: VisaApplicationTypeTileProps) => {
  return (
    <Container>
      <Row>
        <Column>
          <Text
            text={title}
            type="h5"
            size={24}
            weight={600}
            margin={"0 0 0.5rem 0"}
          />
          <Text text={subTitle} type="p" size={16} weight={400} />
        </Column>
        <Div width="fit-content">
          <Text
            text={fee}
            type="h3"
            size={36}
            weight={600}
            whiteSpace="nowrap"
          />
        </Div>
      </Row>
    </Container>
  );
};

export default VisaApplicationTypeTile;

import Flex from "@atom/flex";
import Image from "@atom/image";
import Text from "@atom/text";
import UploadedDocIcon from "@image/form/docUpload/uploadedDoc.svg";
import DotIcon from "@image/form/docUpload/dotIcon.svg";

import { BiTrash } from "react-icons/bi";
import { styled } from "styled-components";
import Button from "@atom/button";

const Container = styled.div`
  height: 82px;
  width: 100%;
  display: flex;
  align-item: center;
  justify-content: center;
  background-color: #f3fafd;
  padding: 0 16px;
  border: solid 1px #7bbbd6;
  border-radius: 8px;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;
const InnerRow = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TextColumn = styled.div`
  width: 100%;
  flex-grow: 1;
`;
interface UploadedDocTileProps {
  fileName: string;
  fileSize: string;
  fileType: string;
  removeDocument(): void;
  marginBottom: string;
}

const UploadedDocTile = ({
  fileName,
  fileType,
  fileSize,
  removeDocument,
  marginBottom,
}: UploadedDocTileProps) => {
  return (
    <Container style={{ marginBottom }}>
      <Row>
        <Image
          src={UploadedDocIcon}
          alt={"document_icon"}
          width={40}
          height={40}
          style={{ marginRight: "16px" }}
        />
        <InnerRow>
          <TextColumn>
            <Text
              text={fileName}
              type={"p"}
              size={18}
              weight={600}
              color="#4A7181"
            />
            <Flex align="center">
              <Text
                text={"JPG" ?? fileType.toUpperCase()}
                type={"p"}
                size={14}
                weight={500}
                color="#4A7181"
              />
              <Image
                src={DotIcon}
                alt={"dot"}
                width={6}
                height={6}
                style={{ margin: "0 8px" }}
              />
              <Text
                text={"3.5 MB" ?? fileSize}
                type={"p"}
                size={14}
                weight={500}
                color="#4A7181"
              />
            </Flex>
          </TextColumn>
          <Button onClick={removeDocument} background="transparent" padding="0">
            <BiTrash size={24} color="#4A7181" />
          </Button>
        </InnerRow>
      </Row>
    </Container>
  );
};

export default UploadedDocTile;

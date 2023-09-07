import Flex from "@components/templates/flex";
import Image from "@atom/image";
import Text from "@atom/text";

import { BiTrash } from "react-icons/bi";
import { styled } from "styled-components";
import Button from "@atom/button";
import { useScreenResolution } from "@lib/hook/useScreenResolution";

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
  const { isMobile } = useScreenResolution();
  return (
    <Container style={{ marginBottom }}>
      <Row>
        <Image
          src={"/assets/images/form/docUpload/uploadedDoc.png"}
          alt={"document_icon"}
          width={40}
          height={40}
          styles={{ marginRight: "16px" }}
        />
        <InnerRow>
          <TextColumn
            style={
              {
                // maxWidth: isMobile ? "260px" : "unset",
                // whiteSpace: "nowrap",
                // overflow: "hidden",
                // textOverflow: "ellipsis",
                // overflow: "hidden",
              }
            }
          >
            <Text
              text={fileName}
              type={"p"}
              size={18}
              weight={600}
              color="#4A7181"
              styles={{
                maxWidth: isMobile ? "230px" : "unset",

                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                // maxWidth: isMobile ? "260px" : "unset",
                // textOverflow: "ellipsis",
              }}
            />
            <Flex align="center">
              <Text
                text={fileType}
                type={"p"}
                size={14}
                weight={500}
                color="#4A7181"
              />
              <Image
                src={"/assets/images/form/docUpload/dotIcon.png"}
                alt={"dot"}
                width={6}
                height={6}
                styles={{ margin: "0 8px" }}
              />
              <Text
                text={fileSize}
                type={"p"}
                size={14}
                weight={500}
                color="#4A7181"
              />
            </Flex>
          </TextColumn>
          <Button
            onClick={removeDocument}
            background="transparent"
            padding="0"
            width="fit-content"
          >
            <BiTrash size={24} color="#4A7181" />
          </Button>
        </InnerRow>
      </Row>
    </Container>
  );
};

export default UploadedDocTile;

"use client";
import { styled } from "styled-components";
import DocPlus from "@image/form/docUpload/docPlus.svg";
import Image from "@atom/image";
import Text from "@atom/text";
import Button from "@atom/button";
import { useScreenResolution } from "hook/useScreenResolution";
const DocUploadWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1.2px dashed var(--foundation-blue-blue-600, #7bbbd6);
  padding: 50px 0px;
`;
const DocUploadCenteredChild = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DocUploadInput = () => {
  const { isMobile } = useScreenResolution();

  return (
    <DocUploadWrapper>
      <DocUploadCenteredChild>
        <Image
          style={{ marginBottom: "21px" }}
          src={DocPlus}
          alt="add_doc_icon"
          height={56}
          width={56}
        />
        <Text
          styles={{ marginBottom: "56px" }}
          type={"p"}
          text="PNG, JPG, PDF up to 10MB"
          weight={400}
          size={16}
          color="#929292"
        />
        <Text
          styles={{ marginBottom: "18px" }}
          type={"p"}
          text="Drag or drop your file here"
          weight={600}
          size={20}
          color="#929292"
        />
        <Button
          padding="0 16px"
          background="#DAF0F9"
          width="auto"
          borderRadius="4px"
        >
          <Text
            color="#6092A7"
            text="Upload File"
            type={"p"}
            weight={600}
            size={16}
          />
        </Button>
      </DocUploadCenteredChild>
    </DocUploadWrapper>
  );
};

export default DocUploadInput;

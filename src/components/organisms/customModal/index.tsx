import { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "@mui/material/Modal";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import { Span } from "@/components/molecules/stays/view/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import LanguageList from "./components copy/LanguageList";
import CurrencyList from "./components copy/CurrencyList";
import Input from "@/components/atoms/input";
import { CiSearch } from "react-icons/ci";
import Section from "@/components/molecules/section";

const ModalCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  &.amenities {
    overflow-y: auto;
    @media screen and (max-width: 900px) {
      overflow-y: none;
    }
  }
  @media screen and (max-width: 900px) {
    overflow-x: hidden;
  }
`;
const ModalScroll = styled.div`
  width: 900px;
  height: 500px;
  max-height: 500px;
  // overflow: auto;
  background: white;
  border-radius: 20px;
  &.map_scroll,
  &.gallery {
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
  &.amenities_scroll {
    // overflow: hidden;
    margin-bottom: 20px;
  }
  &.search_box {
    width: 600px;
  }
  @media screen and (max-width: 900px) {
    width: 100% !important;
    overflow-x: hidden;
    height: 100%;
    border-radius: 0px;
    &.amenities_scroll {
      width: 100% !important;
      height: 100%;
      margin-top: 0px;
      margin-bottom: 0px;
    }
    &.search_box {
      width: 100% !important;
    }
  }
`;
const ModalWrapper = styled.div`
  height: 500px;

  &.map_wrapper,
  &.gallery_modal {
    height: 100%;
  }
  &.review_wrapper,
  &.gallery_modal {
    // overflow-y: auto;
  }
  &.amenities_modal {
    // height: 500px;
    // overflow-y: auto;
    // padding: 10px 0px;
    // padding-bottom: 75px;
  }
  @media screen and (max-width: 900px) {
    width: 100% !important;
    height: 100%;
    overflow-x: hidden !important;
  }
`;
export const LanguageModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  return (
    <Modal disableScrollLock={true} open={open} onClose={handleClose}>
      <ModalCenter className="amenities">
        <ModalScroll className="amenities_scroll">
          <Flex
            padding="0px 35px"
            align="center"
            justify="space-between"
            gap="20px"
            styles={{ marginTop: "20px" }}
          >
            <Text type="h1" size={23} text="Select Languages" weight={600} />
            <CloseIcon
              style={{ fontSize: "29px", cursor: "pointer" }}
              onClick={handleClose}
            />
          </Flex>
          <ModalWrapper className="amenities_modal">
            <Span style={{ padding: "15px" }}>
              <LanguageList />
            </Span>
          </ModalWrapper>
        </ModalScroll>
      </ModalCenter>
    </Modal>
  );
};
export const CurrencyModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [search, setSearch] = useState<string>('');

  return (
    <Modal disableScrollLock={true} open={open} onClose={handleClose}>
      <ModalCenter className="amenities">
        <ModalScroll className="amenities_scroll">
          <Section styles={{ boxShadow: '0 1px 2px 0.5px rgba(0, 0, 0, 0.04)', paddingBottom: '10px' }}>
            <Flex align="center" justify="flex-end" padding="15px 19px 0px">
              <CloseIcon
                style={{ fontSize: "29px", cursor: "pointer", fontWeight: "300" }}
                onClick={handleClose}
              />
            </Flex>
            <Flex
              padding="0px 35px"
              align="center"
              gap="120px"
            // styles={{ marginTop: "20px" }}
            >
              <Text type="h1" size={23} text="Select Currency" width='max-content' weight={600} />

              <Flex gap="10px" align="center" justify="center" width="auto">
                <Flex
                  justify="flex-start"
                  align="center"
                  border="1px solid #E7E7E7"
                  padding="0px 10px"
                  borderRadius="8px"
                  borderBottom="1px solid #E7E7E7"
                  width="360px"
                  maxWidth="360px"
                  gap="10px"
                // styles={{ display: isMobile ? 'none' : 'flex' }}
                >
                  <CiSearch size="1.5rem" color="#5C5C5C" width="20%" />
                  <Section width="100%">
                    <Input
                      padding="0px 20px 0 0"
                      placeholder="Type here to search"
                      styles={{
                        border: "none",
                      }}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </Section>
                </Flex>
              </Flex>

            </Flex>{" "}
          </Section>

          <ModalWrapper className="amenities_modal" >
            <Span style={{ padding: "0 15px 15px", height: '300px' }}>
              <CurrencyList currSearch={search} />
            </Span>
          </ModalWrapper>
        </ModalScroll>
      </ModalCenter>
    </Modal>
  );
};


import { FlexBox, Span } from "./styles";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import Button from "@/components/atoms/button";
import { ttColors } from "@/lib/theme/colors";
import React, { ReactElement, Dispatch, SetStateAction } from "react";

interface DeletePriceAlertBoxProps {
  setOpen: Dispatch<SetStateAction<{ alert: boolean }>>;
}

function DeletePriceAlertBox({
  setOpen,
}: DeletePriceAlertBoxProps): ReactElement {
  return (
    <Span style={{ width: "100%" }}>
      <Flex
        width="100%"
        direction="column"
        gap="10px"
        styles={{ textAlign: "center" }}
      >
        <Flex justify="center" align="center">
          <Span
            style={{
              height: "80px",
              width: "80px",
              backgroundColor: "var(--color-red-bg)",
              borderRadius: "50%",
            }}
          >
            <Flex align="center" justify="center" width="100%" height="100%">
              <DeleteForeverOutlinedIcon
                style={{ fontSize: "35px", color: "#B00020" }}
              />
            </Flex>
          </Span>
        </Flex>
        <Span>
          <Flex>
            <Text
              type="h2"
              weight={600}
              text="Delete Price Alert for Stays in this Location?"
            ></Text>
          </Flex>
        </Span>
        <Span>
          <Text
            type="p"
            size={14}
            color="var(--text-gray-color)"
            text="We won't provide notifications for price changes but should you have a change of heart, you are welcome to set up a fresh price alert at any time."
          ></Text>
        </Span>

        <FlexBox className="price_alert">
          <Button
            background="transparent"
            color={ttColors.gray}
            border={`1px solid ${ttColors.gray}`}
            width="150px"
            styles={{ background: "transparent !important" }}
            onClick={() =>
              setOpen((prev) => ({
                ...prev,
                alert: false,
              }))
            }
          >
            <Text
              type="p"
              color="var(--text-gray-color)"
              weight={500}
              size={15}
              text="No Thanks"
            ></Text>
          </Button>
          <Button
            background="#B00020"
            color={ttColors.dark}
            width="150px"
            styles={{ background: "transparent !important" }}
            onClick={() =>
              setOpen((prev) => ({
                ...prev,
                alert: false,
              }))
            }
          >
            <Text
              color="var(--default-color)"
              type="p"
              weight={500}
              size={15}
              text="Delete"
            ></Text>
          </Button>
        </FlexBox>
      </Flex>
    </Span>
  );
}

export default DeletePriceAlertBox;

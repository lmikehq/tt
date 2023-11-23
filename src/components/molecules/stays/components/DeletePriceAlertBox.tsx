import React, { useState } from "react";
import { Span } from "./styles";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import Button from "@/components/atoms/button";
import { ttColors } from "@/lib/theme/colors";

function DeletePriceAlertBox() {
  const [open, setOpen] = useState({
    alert: false,
  });
  return (
    <Span>
      <Flex direction="column">
        <Span>
          <DeleteForeverOutlinedIcon />
        </Span>
        <Span style={{ height: "50px", width: "50px" }}>
          <Text
            type="h2"
            text="Delete Price Alert for Stays in this Location?"
          ></Text>
        </Span>
        <Span>
          <Text
            type="p"
            text="We won't provide notifications for price changes but should you have a change of heart, you are welcome to set up a fresh price alert at any time."
          ></Text>
        </Span>
        <Span>
          <Flex gap="20px">
            <Button
              background="transparent"
              color={ttColors.gray}
              border={`1px solid ${ttColors.gray}`}
              padding="7px 10px"
              styles={{ background: "transparent !important" }}
              onClick={() =>
                setOpen((prev) => ({
                  ...prev,
                  alert: false,
                }))
              }
            >
              <Text type="p" weight={500} size={15} text="Change"></Text>
            </Button>
            <Button
              background="#B00020"
              color={ttColors.dark}
              padding="7px 10px"
              styles={{ background: "transparent !important" }}
              onClick={() =>
                setOpen((prev) => ({
                  ...prev,
                  alert: false,
                }))
              }
            >
              <Text type="p" weight={"bold"} size={15} text="Change"></Text>
            </Button>
          </Flex>
        </Span>
      </Flex>
    </Span>
  );
}

export default DeletePriceAlertBox;

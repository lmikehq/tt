import Section from "src/components/molecules/section";
import SortingColumns from "../listings/sortingColumns";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import { ttColors } from "@/lib/theme/colors";
import { useState } from "react";
import Button from "@/components/atoms/button";
import { FilterModal, SortModal } from "../listings/stayModal";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TuneIcon from "@mui/icons-material/Tune";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MapIcon from "@mui/icons-material/Map";

type sortProps = {
  results: number;
  sortType: string;
};

function SortedColumn({ results, sortType }: sortProps) {
  const { isMobile } = useScreenResolution();
  const sorted = sortType.charAt(0).toUpperCase() + sortType.slice(1);
  const [open, setOpen] = useState({
    filter: false,
    sort: false,
  });

  return (
    <Section>
      {isMobile ? (
        <>
          <Flex align="center" padding="10px">
            <Flex
              align="center"
              gap="20px"
              overflowX="scroll"
              className="scroll_filter_container"
            >
              <Button
                padding="10px 20px"
                width="max-content"
                color="var(--text-color)"
                background="transparent"
                border="2px solid var(--color-border)"
                styles={{ whiteSpace: "nowrap" }}
              >
                <NotificationsIcon />
              </Button>
              <Button
                color="var(--text-color)"
                width="max-content"
                padding="10px 20px"
                background="transparent"
                border="2px solid var(--color-border)"
                styles={{ whiteSpace: "nowrap" }}
                onClick={() =>
                  setOpen((prev) => ({
                    ...prev,
                    filter: true,
                  }))
                }
              >
                <Flex gap="5px">
                  <TuneIcon />
                  <Text type="p" text="Filter" weight={600} size={18} />
                </Flex>
              </Button>
              <Button
                padding="10px 20px"
                color="var(--text-color)"
                width="max-content"
                background="transparent"
                border="2px solid var(--color-border)"
                styles={{ whiteSpace: "nowrap" }}
                onClick={() =>
                  setOpen((prev) => ({
                    ...prev,
                    sort: true,
                  }))
                }
              >
                <Text type="p" text="Sort" weight={600} size={18} />
                <KeyboardArrowDownIcon />
              </Button>
              <Button
                padding="10px 20px"
                color="var(--text-color)"
                width="max-content"
                background="transparent"
                border="2px solid var(--color-border)"
                styles={{ whiteSpace: "nowrap" }}
              >
                <Flex gap="5px">
                  <MapIcon />
                  <Text type="p" text="Map" weight={600} size={18} />
                </Flex>
              </Button>
              <Button
                padding="10px 20px"
                color="var(--text-color)"
                width="max-content"
                background="transparent"
                border="2px solid var(--color-border)"
                styles={{ whiteSpace: "nowrap" }}
              >
                <Text
                  type="p"
                  text="Accommodation Type"
                  weight={600}
                  size={18}
                />
                <KeyboardArrowDownIcon />
              </Button>
              <Button
                padding="10px 20px"
                color="var(--text-color)"
                width="max-content"
                background="transparent"
                border="2px solid var(--color-border)"
                styles={{ whiteSpace: "nowrap" }}
              >
                <Text
                  type="p"
                  text="Cancellation Policy"
                  weight={600}
                  size={18}
                />
                <KeyboardArrowDownIcon />
              </Button>
              <Button
                padding="10px 20px"
                color="var(--text-color)"
                width="max-content"
                background="transparent"
                border="2px solid var(--color-border)"
                styles={{ whiteSpace: "nowrap" }}
              >
                <Text type="p" text="Meal plan" weight={600} size={18} />
                <KeyboardArrowDownIcon />
              </Button>
              <Button
                padding="10px 20px"
                color="var(--text-color)"
                width="max-content"
                background="transparent"
                border="2px solid var(--color-border)"
                styles={{ whiteSpace: "nowrap" }}
              >
                <Text
                  type="p"
                  text="Facilities & Services"
                  weight={600}
                  size={18}
                />
                <KeyboardArrowDownIcon />
              </Button>
              <Button
                padding="10px 20px"
                color="var(--text-color)"
                width="max-content"
                background="transparent"
                border="2px solid var(--color-border)"
                styles={{ whiteSpace: "nowrap" }}
              >
                <Text
                  type="p"
                  text="Accommodation Features"
                  weight={600}
                  size={18}
                />
                <KeyboardArrowDownIcon />
              </Button>
              <Button
                padding="10px 20px"
                color="var(--text-color)"
                width="max-content"
                background="transparent"
                border="2px solid var(--color-border)"
                styles={{ whiteSpace: "nowrap" }}
              >
                <Text type="p" text="Property Type" weight={600} size={18} />
                <KeyboardArrowDownIcon />
              </Button>
              <Button
                padding="10px 20px"
                color="var(--text-color)"
                width="max-content"
                background="transparent"
                border="2px solid var(--color-border)"
                styles={{ whiteSpace: "nowrap" }}
              >
                <Text type="p" text="Types of Bed" weight={600} size={18} />
                <KeyboardArrowDownIcon />
              </Button>
            </Flex>
            <FilterModal
              open={open.filter}
              handleClose={() =>
                setOpen((prev) => ({
                  ...prev,
                  filter: false,
                }))
              }
            />
            <SortModal
              open={open.sort}
              handleClose={() =>
                setOpen((prev) => ({
                  ...prev,
                  sort: false,
                }))
              }
            />
          </Flex>
        </>
      ) : (
        <SortingColumns />
      )}
    </Section>
  );
}

export default SortedColumn;

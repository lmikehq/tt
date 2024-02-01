import Flex from "@/components/templates/flex";
import { FlightHistory, TextContainer } from "../flight";
import Text from "@/components/atoms/text";
import Image from "@/components/atoms/image";
import SimplePopper from "@/components/organisms/SimplePopper/SimplePopper";
import { useState } from "react";
import { Grid } from "@/components/templates/grid";
import FlightIcon from "public/assets/icons/dashboard/plane-track.svg";


export const MultiFlightComp = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleHover = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
    setOpen((prev) => !prev);
  };

  const reset = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <FlightHistory>
      <Flex align="stretch" gap="20px">
        <Flex direction="column" styles={{ flexBasis: '80%', flexGrow: 1 }}>
          {[1, 2, 3].map((key) => {
            return (
              <Grid columns={''} style={{ gridTemplateColumns: '1fr auto 1fr' }} align="center" gap="80px" padding="28px 24px" key={key}>
                <Flex gap="1.5rem" align="center">
                  <Flex direction="column" align="center" justify="flex-start" width="15%">
                    <Text type="h1" text="25" size={48} weight={600} />
                    <Text
                      type="p"
                      text="Aug"
                      size={20}
                      weight={200}
                      styles={{ position: "relative", top: "-10px" }}
                    />
                  </Flex>
                  <Flex justify="flex-start" gap="18px">
                    <Flex direction="column" width="max-content">
                      <Text
                        type="h3"
                        text="Murtala Muhammed Airport"
                        margin="0px 0px .5rem"
                        onMouseEnter={handleHover}
                        onMouseLeave={reset}
                      />
                      <SimplePopper open={open} anchorEl={anchorEl}>
                        <Text
                          type="h3"
                          text="Murtala Muhammed Airport"
                          margin="0px 0px .5rem"
                        />
                      </SimplePopper>

                      <Text
                        type="p"
                        text="11:25"
                        color="#606060"
                        weight={600}
                        size={16}
                        styles={{
                          letterSpacing: "0.1rem",
                        }}
                      />
                    </Flex>
                    <Text type="p" text="LAG" color="#929292" />
                  </Flex>
                </Flex>

                <Flex direction="column" align="center" justify="center" gap="1rem">
                  <Image src={FlightIcon} alt="" width={119} height={20} />
                  <TextContainer>
                    <Text type="p" text="3 Stops" />
                  </TextContainer>
                </Flex>

                <Flex gap="0rem" align="center">
                  <Flex justify="flex-start" gap="18px">
                    <Flex direction="column" width="max-content">
                      <Text
                        type="h3"
                        text="Düsseldorf International Airport"
                        margin="0px 0px .5rem"
                      />

                      <Text
                        type="p"
                        text="11:25"
                        color="#606060"
                        weight={600}
                        size={16}
                        styles={{
                          letterSpacing: "0.1rem",
                        }}
                      />
                    </Flex>
                    <Text type="p" text="DUS" color="#929292" />
                  </Flex>
                </Flex>
              </Grid>

            );
          })}
        </Flex>

        <Flex styles={{ flexBasis: '20%' }}>
          <Flex direction="row" align="center" justify="center" width="100%" height="100%">
            <div style={{ transform: "rotate(-90deg)" }}>
              <Text
                type="h3"
                text="MULTI CITY"
                size={28}
                weight={600}
                color="#7BBBD6"
                styles={{
                  height: '100%',
                  width: '100%'
                }}
              />
            </div>
          </Flex>
        </Flex>

      </Flex>
    </FlightHistory>
  );
};

"use client";

import Button from "@/components/atoms/button";
import Image from "@/components/atoms/image";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { Grid } from "@/components/templates/grid";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { GiPassport } from "react-icons/gi";
import { IoBed } from "react-icons/io5";
import { RiPlaneLine } from "react-icons/ri";
import styled from "styled-components";


const HeroImg = styled.div`
  position: relative;
  object-fit: cover;

  @media (max-width: 900px) {
    display: none;
  }
`;

const HeroCard = styled.div`
  position: absolute;
  width: 552px;
  height: fit-content;
  top: 80px;
  left: 80px;
  border-radius: 12px;
  background: #fff;
  padding: 30px;

  @media (max-width: 900px) {
    width: 100%;
    position: relative;
    background: #e7e7e76e;
    border: 1px solid #e7e7e7;
    top: 0;
    left: 0;
  }
`;

const InfluencerIcon = styled.div`
  width: 116px;
  height: 93px;
  border-radius: 6px;
  background: #7bbbd6;
  color: #fff;
  padding: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

    @media (max-width: 900px) {
        width: 87px;
        height: 70px;
    }
`;

const Box = styled.div`
  width: 123px;
  height: 102px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;

  &:hover {
    background: #fff;

    .icon {
      color: #6092a7;
    }
  }

  .icon {
    color: #87ceeb;
  }

  @media (max-width: 900px) {
    height: 70px;
    width: 77px;
  }
`;

const Card = styled.div``;

const InfluencerPage = () => {
  const { isMobile } = useScreenResolution();

    return (
      <>
        <div>
          <HeroImg>
            <Image
              src="/assets/images/influencer/heroImg.png"
              alt=""
              styles={{ borderRadius: "8px" }}
              height={806}
            />
          </HeroImg>

          <HeroCard>
            <Flex
              gap="1rem"
              margin={isMobile ? "0 auto 1.5rem" : "0 auto 1rem"}
            >
              <InfluencerIcon>
                <Text
                  type="h5"
                  text="THRILLERS INFLUENCER"
                  weight={600}
                  size={isMobile ? 12 : 14}
                />
              </InfluencerIcon>
              <Flex direction="column">
                <Text
                  type="p"
                  text="You were Invited by"
                  color="#000000"
                  weight={400}
                  size={isMobile ? 13 : 16}
                />
                <Text
                  type="h3"
                  text="Sabinus"
                  color="#000000"
                  weight={600}
                  size={28}
                />
              </Flex>
            </Flex>
            <Text
              type="p"
              text="Apply for Visa at your own convenience on our platform"
              weight={500}
              size={18}
              styles={{ lineHeight: isMobile ? "30px" : "36px" }}
              width={isMobile ? 300 : 425}
            />
            <Flex
              align="center"
              width="100%"
              background="#c8e8f680"
              height={isMobile ? "105px" : "145px"}
              borderRadius="12px"
              border="1px solid #c8e8f6"
              borderBottom="1px solid #c8e8f6"
              margin="2.5rem 0"
              padding={isMobile ? "10px" : "20px"}
              justify="space-between"
            >
              <Box>
                <GiPassport size="2rem" className="icon" />
              </Box>
              <Box>
                <RiPlaneLine size="2rem" className="icon" />
              </Box>
              <Box>
                <IoBed size="2rem" className="icon" />
              </Box>
            </Flex>

            <Button width="100%">
              <Text type="h3" text="Get Started" weight={500} size={16} />
            </Button>
          </HeroCard>
            </div>
            
        <Flex direction="column" margin="2rem auto" justify="center" align="center">
          <Flex direction="column" margin="0 auto 1.5rem">
            <Text
              type="h2"
              text="WHY THRILLERS TRAVELS?"
              size={30}
              weight={700}
              styles={{ lineHeight: "48px" }}
            />
            <Text
              type="p"
                        text="At Thrillers Travels, we redefine the art of travel, offering unparalleled journeys to destinations that inspire and captivate."
                        color="#606060" size={16} weight={400}
            />
                </Flex>
                <Grid columns={isMobile ? "1" : "3"}>
                    <Card>
                        <Flex direction="column">
                            <Image src="/assets/images/influencer/icon/book.png" alt="" />
                    </Flex>
                    </Card>
                </Grid>
        </Flex>
      </>
    );
};

export default InfluencerPage;

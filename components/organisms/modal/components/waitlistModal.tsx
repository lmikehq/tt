"use client";
import Text from "@atom/text";
import lottie from "@lottie/check-mark.json";
import Lottie from "lottie-react";
import { IoCloseSharp } from "react-icons/io5";

import Button from "@atom/button";
import Flex from "@atom/flex";
import Link from "@atom/link";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { styled } from "styled-components";
import Modal from "..";
import { useRouter } from "next/navigation";

const Wrapper = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 40vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }

    @media (max-width: 768px) {
    width: 80vw;
    }
`;

function WaitlistModal({
  open,
  handleClose,
  number,
}: {
  open: boolean;
  handleClose: () => void;
  number: string;
}) {
  const router = useRouter();
  return (
    <Modal open={open} handleClose={handleClose}>
      <Wrapper>
        <span>
          <IoCloseSharp onClick={handleClose} size={24} color="#959AA5" />
        </span>
        <Lottie animationData={lottie} style={{ width: "160px" }} />
        <Text type="p" text="You're on the waitlist!" size={25} weight={500} />
        {number && (
          <Flex width="fit-content" align="center" gap=".4rem">
            <Text type="p" text={`Your number is`} size={13} weight={500} />
            <Text
              type="p"
              text={` ${number}`}
              size={20}
              weight={500}
              //   color={ttColors.primary}
              decoration="underline"
            />
          </Flex>
        )}
        <Flex
          width="fit-content"
          align="center"
          gap=".4rem"
          margin="2rem 0 .5rem"
        >
          {[
            {
              color: "#3B5998",
              icon: <FaFacebookF />,
              url: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fthrillers.travel%2Fwaitlist",
            },
            {
              color: "#1DA1F2",
              icon: <FaTwitter />,
              url: "https://twitter.com/intent/tweet?text=Thrillers%20Travels%20Waitlist%3A%20From%20seamless%20travel%20bookings%20to%20personalized%20trip%20planning%2C%20visa%20assistance%2C%20and%20educational%20opportunities%20abroad%2C%20we%27ve%20got%20you%20covered.%20Be%20the%20first%20to%20access%20exclusive%20offers%20and%20insider%20travel%20tips.%20Don%27t%20miss%20out%20on%20the%20journey%20of%20a%20lifetime%20%E2%80%93%20sign%20up%20now%20and%20let%20the%20adventures%20begin%21%20%E2%9C%88%EF%B8%8F%F0%9F%8C%8D%20https%3A%2F%2Fthrillers.travel%2Fwaitlist",
            },
            {
              color: "#E1306C",
              icon: <BsInstagram />,
              url: "https://www.instagram.com/p/CuuGZniI0CO/?igshid=MzRlODBiNWFlZA%3D%3D",
            },
            {
              color: "#0A66C2",
              icon: <FaLinkedinIn />,
              url: "https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fthrillers.travel%2Fwaitlist&title=Thrillers%20Travels%20Waitlist&summary=From%20seamless%20travel%20bookings%20to%20personalized%20trip%20planning%2C%20visa%20assistance%2C%20and%20educational%20opportunities%20abroad%2C%20we%27ve%20got%20you%20covered.%20Be%20the%20first%20to%20access%20exclusive%20offers%20and%20insider%20travel%20tips.%20Don%27t%20miss%20out%20on%20the%20journey%20of%20a%20lifetime%20%E2%80%93%20sign%20up%20now%20and%20let%20the%20adventures%20begin%21%20%E2%9C%88%EF%B8%8F%F0%9F%8C%8D",
            },
          ].map((item, index) => (
            <Link target="_blank" href={item.url}>
              <Button
                key={index}
                background={item.color}
                height="30px"
                width="40px"
                borderRadius="4px"
              >
                {item.icon}
              </Button>
            </Link>
          ))}
        </Flex>
        <Text type="p" text="Share with your friends" size={13} weight={500} />
        <Link href="https://wa.me/2349077210321?text=Hello%20Thrillers%20Travels%2C%20I%20came%20from%20your%20waitlist%20page%20and%20would%20like%20to%20learn%20about%20how%20you%20operate.">
          <Flex
            align="center"
            gap=".3rem"
            margin="2rem 0 0"
            styles={{
              borderBottom: `2px solid #25D366`,
              cursor: "pointer",
            }}
          >
            <Text
              type="p"
              text="Chat with us"
              size={13}
              weight={500}
              color="#25D366
"
            />
            <AiOutlineWhatsApp
              color="#25D366
"
            />
          </Flex>
        </Link>
      </Wrapper>
    </Modal>
  );
}

export default WaitlistModal;

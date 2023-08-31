"use client";

// import Section from "@molecule/section";
// import NoVisa from "@image/noVisa.png";
// import Image from "@atom/image";
// import NoVisaBg from "@image/background.png";
// import styled from "styled-components";
// import Text from "@atom/text";
// import Flex from "@atom/flex";
// import Link from "@atom/link";

// const AbsoluteImg = styled.div`
//   top: "30px";
//   left: "38%";
// `;

// const NoVisaWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const NoVisaApplication: React.FC = () => {
//   return (
//     <NoVisaWrapper>
//       <Section
//         styles={{
//           display: "flex",
//           position: "relative",
//           justifyContent: "center",
//           backgroundRepeat: "no-repeat",
//           alignContent: "center",
//         }}
//       >
//         <Image src={NoVisaBg} alt="no-visa-bg" width={369.96} height={382.06} />
//         <AbsoluteImg
//           style={{
//             position: "absolute",
//             left: "30%",
//             top: "19px",
//           }}
//         >
//           <Image src={NoVisa} alt="no-visa" width={330.89} height={331.03} />
//         </AbsoluteImg>
//       </Section>
//       <Text
//         type="p"
//         text="You’ve got no Visa Application - Let’s help you get Started "
//         weight={600}
//         size={24}
//         margin="2.5rem auto 1rem"
//         styles={{ lineHeight: "34px" }}
//       />
//       <Flex justify="center" gap="1rem" margin="0">
//         <Link href="">
//           <Text
//             type="p"
//             text="Search Flights"
//             color="#6092A7"
//             decoration="underline"
//           />
//         </Link>
//         <Link href="">
//           <Text
//             type="p"
//             text="Search Stays"
//             color="#6092A7"
//             decoration="underline"
//           />
//         </Link>
//       </Flex>
//     </NoVisaWrapper>
//   );
// };

// export default NoVisaApplication;

import Flex from "@atom/flex";
import Image from "@atom/image";
import Link from "@atom/link";
import Text from "@atom/text";
import Section from "@molecule/section";
import { useScreenResolution } from "hook/useScreenResolution";
import React from "react";
import styled from "styled-components";

const NoVisaWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
interface LinkItem {
  text: string;
  url: string;
}
export interface NoVisaApplicationProps {
  noVisaImage: any;
  content: {
    title: string;
    links: LinkItem[];
  };
}

const NoApplication: React.FC<NoVisaApplicationProps> = ({
  noVisaImage,
  content,
}) => {
  const { isMobile } = useScreenResolution();

  return (
    <NoVisaWrapper>
      <Section
        styles={{
          display: "flex",
          position: "relative",
          justifyContent: "center",
          backgroundRepeat: "no-repeat",
          alignContent: "center",
        }}
      >
        <Image
          src={noVisaImage.src}
          alt="no-visa"
          width={330.89}
          height={331.03}
        />
      </Section>
      <Text
        type="p"
        text={content.title}
        weight={600}
        size={24}
        margin="2.5rem auto 1rem"
        styles={{ lineHeight: "34px" }}
        textAlign={isMobile ? "center" : "left"}
      />
      <Flex justify="center" gap="1rem" margin="0">
        {content.links.map((link) => (
          <Link href={link.url} key={link.text}>
            <Text
              type="p"
              text={link.text}
              color="#6092A7"
              decoration="underline"
            />
          </Link>
        ))}
      </Flex>
    </NoVisaWrapper>
  );
};

// NoVisaApplication.propTypes = {
//   noVisaImage: PropTypes.string.isRequired,
//   content: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     links: PropTypes.arrayOf(
//       PropTypes.shape({
//         text: PropTypes.string.isRequired,
//         url: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//   }).isRequired,
// };

export default NoApplication;

// "use client";

// import { Grid } from "@atom/grid";
// import Link from "@atom/link";
// import Text from "@atom/text";
// import Section from "@molecule/section";
// import { styled } from "styled-components";

// const ContactLink = styled.div`
//   height: 300px;
//   width: 100%;
//   background: #f8fafc;
//   border-radius: 8px;
//   padding: 1rem;

//   @media screen and (max-width: 900px) {
//     height: 200px;
//   }
// `;

// function UsefulLinks() {
//   const navigationLinks = [
//     {
//       number: "01",
//       text: "Chat with our AI",
//       href: "",
//     },
//     {
//       number: "02",
//       text: "Chat with an Agent",
//       href: "",
//     },
//     {
//       number: "03",
//       text: "Chat with our travel guide",
//       href: "",
//     },
//     {
//       number: "04",
//       text: "Testimony",
//       href: "",
//     },
//   ];
//   return (
//     <ContactLink>
//       <Text type="h4" text="Navigate to:" size="1rem" />
//       <Section margin="1rem 0 0">
//         {navigationLinks.map((link) => (
//           <Grid columns="2% 98%" gap="1rem" key={link.number} align="center">
//             <Text type="h6" text={link.number} color="#343a40" />
//             <Link href={link.href}>
//               <Text
//                 type="p"
//                 decoration="underline"
//                 color="#87CEEB"
//                 weight="500"
//                 letterSpacing={1}
//                 text={link.text}
//               />
//             </Link>
//           </Grid>
//         ))}
//       </Section>
//     </ContactLink>
//   );
// }

// export default UsefulLinks;

import { Grid } from "@atom/grid";
import Link from "@atom/link";
import Text from "@atom/text";
import Section from "@molecule/section";
import { styled } from "styled-components";

const ContactLink = styled.div`
  height:fit-content;
  width: 100%;
  background: #f8fafc;
  border-radius: 8px;
  padding: 1rem;

  @media screen and (max-width: 900px) {
    height: fit-content;
  }
`;

type NavigationLink = {
  number: string;
  text: string;
  href: string;
};

function UsefulLinks({
  navigationLinks,
}: {
  navigationLinks: NavigationLink[];
}) {
  return (
    <ContactLink>
      <Text type="h4" text="Navigate to:" size="1rem" />
      <Section margin="1rem 0 0" styles={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}>
        {navigationLinks.map((link) => (
          <Grid columns="2% 98%" gap="1rem" key={link.number} align="center">
            <Text type="h6" text={link.number} color="#343a40" />
            <Link href={link.href}>
              <Text
                type="p"
                decoration="underline"
                color="#87CEEB"
                weight="500"
                letterSpacing={1}
                text={link.text}
              />
            </Link>
          </Grid>
        ))}
      </Section>
    </ContactLink>
  );
}

export default UsefulLinks;


import { List } from "@mui/material";
import { ReactNode } from "react";
import { styled } from "styled-components";
import { ttColors } from "@lib/theme/colors";

interface ListProps {
  children: ReactNode;
}

const BlueBulletList = styled(List)`
  list-style-type: none;
  padding: 0;

  li {
    position: relative;
    padding-left: 24px;
    &::before {
      content: "\\2022";
      position: absolute;
      left: 0;
      font-size: 30px;
      color: ${ttColors.primary};
    }
  }
`;

export default function BulletList({ children }: ListProps) {
  return <BlueBulletList>{children}</BlueBulletList>;
}

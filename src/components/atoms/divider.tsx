import styled from "styled-components";

export const Divider = styled.div<{
  margin?: string;
  direction?: string;
  borderStyle?: string;
  px?: string;
}>`
  border-bottom: ${({ direction, borderStyle, px = "2px" }) =>
    direction === "horizontal"
      ? `${px} ${borderStyle || "solid"} #dedee3`
      : "none"};
  border-left: ${({ direction, borderStyle, px = "2px" }) =>
    direction === "vertical"
      ? `${px} ${borderStyle || "solid"} #dedee3`
      : "none"};
  padding-bottom: 4px;
  margin: ${({ margin }) => margin || "10px 0"};
`;

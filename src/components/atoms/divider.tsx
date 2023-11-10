import styled from "styled-components";

export const Divider = styled.div<{
  margin?: string;
  direction?: string;
  borderStyle?: string;
  px?: string;
  color?: string;
}>`
  border-bottom: ${({ direction, borderStyle, px = "2px", color }) =>
    direction === "horizontal"
      ? `${px} ${borderStyle || "solid"} ${color ?? "#dedee3"}`
      : "none"};
  border-left: ${({ direction, borderStyle, px = "2px", color }) =>
    direction === "vertical"
      ? `${px} ${borderStyle || "solid"} ${color ?? "#dedee3"}`
      : "none"};
  padding-bottom: 4px;
  margin: ${({ margin }) => margin || "10px 0"};
`;

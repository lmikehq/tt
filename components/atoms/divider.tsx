import styled from "styled-components";

export const Divider = styled.div<{ margin?: string, direction?: string, borderStyle?: string }>`
  border-bottom: ${({ direction, borderStyle }) => direction === 'horizontal' ? `1px ${borderStyle || 'solid'} #dedee3` : 'none'};
  border-left: ${({ direction, borderStyle }) => direction === 'vertical' ? `1px ${borderStyle || 'solid'} #dedee3` : 'none'};
  padding-bottom: 4px;
  margin: ${({ margin }) => margin || "10px 0"};
`;

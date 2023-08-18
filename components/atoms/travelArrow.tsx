import React from 'react';
import styled from 'styled-components';
import { AiOutlineCheck } from 'react-icons/ai';
import { IoAirplane } from 'react-icons/io5';
import { ttColors } from 'theme/colors';

const CircleLineWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
`;

const Circle = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  border: 2px solid ${ttColors.primary}
`;

const HorizontalLine = styled.div`
  flex: 1;
  width: 100px;
  height: 1px;
  background-color: ${ttColors.primary};
  position: relative;
`;

const Icon = styled.div`
  position: absolute;
  top: -15px;
  left: calc(50% - 15px);
`;

function TravelArrow() {
  return (
    <CircleLineWrapper>
      <Circle/>
      <HorizontalLine>
        <Icon>
          <IoAirplane color={ttColors.primary} size={30} />
        </Icon>
      </HorizontalLine>
      <Circle/>
    </CircleLineWrapper>
  );
}

export default TravelArrow;

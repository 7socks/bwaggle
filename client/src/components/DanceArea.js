import React from 'react';
import styled from 'styled-components';

const DanceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BeeZone = styled.div`
  height: 25em;
  width: 25em;
`;

const Bee = styled.img`
  height: 2.5em;
  width: auto;
`;

const DanceArea = ({angle, distance}) => {
  return (
    <DanceContainer>
      <BeeZone>
        <Bee angle={angle} distance={distance} src="assets/honeybee.png" alt="honeybee"/>
      </BeeZone>
    </DanceContainer>
  );
};

export default DanceArea;
import React from 'react';
import styled from 'styled-components';

const Bee = styled.img`
  height: 2.5em;
  width: auto;
`;

const DanceArea = ({angle, distance}) => {
  return (
    <div>
      <Bee angle={angle} distance={distance} src="assets/honeybee.png" alt="honeybee"/>
    </div>
  );
};

export default DanceArea;
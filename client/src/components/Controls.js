import React from 'react';
import styled from 'styled-components';

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5em;
`;

const Controls = ({angle, distance, set}) => {
  const handleChange = (e) => {
    set({
      [e.target.name]: e.target.value
    });
  };

  return (
    <ControlsContainer>
      <input name="angle" type="number" value={angle} onChange={handleChange}/>
      <input name="distance" type="range" value={distance} onChange={handleChange}/>
    </ControlsContainer>
  );
};

export default Controls;
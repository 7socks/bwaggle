import React from 'react';
import styled from 'styled-components';

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3em;
  background: rgba(255, 230, 145, .5);
`;

const Controls = ({playing, angle, distance, set}) => {
  const handleChange = (e) => {
    set({
      [e.target.name]: e.target.value
    });
  };

  return (
    <ControlsContainer>
      <button onClick={() => { set({playing: !playing})}}>
        { playing ? 'Stop' : 'Play' }
      </button>
      <input name="angle" type="number" value={angle} onChange={handleChange}/>
      <input name="distance" type="range" value={distance} onChange={handleChange}/>
    </ControlsContainer>
  );
};

export default Controls;
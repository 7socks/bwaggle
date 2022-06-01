import React from 'react';
import styled, { keyframes } from 'styled-components';

const waggle = keyframes`
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-25em);
  }
`;

const loopLeft = keyframes`
  from {
    transform: translateY(-25em) translateX(0);
  }

  50% {
    transform: translateX(12.5em) translateY(-12.5em);
  }

  to {
    transform: translateY(0) translateX(0);
  }
`;

const loopRight = keyframes`
  from {
    transform: translateY(-25em) translateX(0);
  }

  50% {
    transform: translateX(-12.5em) translateY(-12.5em);
  }

  to {
    transform: translateY(0) translateX(0);
  }
`;

const DanceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BeeZone = styled.div`
  height: 25em;
  width: 25em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
`;

const Bee = styled.img`
  height: 4em;
  width: auto;
  animation-name: ${waggle}, ${loopLeft};
  animation-duration: 3s, 3s, 3s;
  animation-iteration-count: 1, 1, 1;
  animation-fill-mode: both, both, both;
  animation-play-state: ${({playing}) => { return playing ? 'running' : 'paused' }};
`;

const DanceArea = ({angle, distance, playing}) => {
  return (
    <DanceContainer>
      <BeeZone>
        <Bee playing={playing} angle={angle} distance={distance} src="assets/honeybee.png" alt="honeybee"/>
      </BeeZone>
    </DanceContainer>
  );
};

export default DanceArea;
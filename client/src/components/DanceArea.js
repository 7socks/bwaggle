import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Stage, Layer, Ellipse } from 'react-konva';

const DanceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BeeZone = styled(Stage)`
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
`;

class DanceArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  animate() {
    this.ellipse.to({
      fill: 'blue',
      duration: 2
    });
  }

  render() {
    return (
      <DanceContainer>
        <Stage width={200} height={200}>
          <Layer>
            <Ellipse
              ref={(node) => { this.ellipse = node }}
              radius={{x: 15, y: 25}}
              x={100}
              y={100}
              fill="black"
              onClick={this.animate.bind(this)}
            />
          </Layer>
        </Stage>
      </DanceContainer>
    );
  }
};

export default DanceArea;
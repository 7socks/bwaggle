import React from 'react';
import styled from 'styled-components';

import Controls from './Controls';
import DanceArea from './DanceArea';

const AppContainer = styled.div`
  background-image: url("assets/honeycomb.png");
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 70% 30%;
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      angle: 0,
      distance: 0,
      playing: false,
      beeRef: null
    };
  }

  render() {
    return (
      <AppContainer>
        <DanceArea playing={this.state.playing} angle={this.state.angle} distance={this.state.distance} beeRef={this.beeRef}/>
        <Controls playing={this.state.playing} angle={this.state.angle} distance={this.state.distance} set={this.setState.bind(this)}/>
      </AppContainer>
    );
  }
}

export default App;
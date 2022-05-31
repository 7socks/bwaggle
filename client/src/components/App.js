import React from 'react';
import styled from 'styled-components';

import Controls from './Controls';
import DanceArea from './DanceArea';

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      angle: 0,
      distance: 0
    };
  }

  render() {
    return (
      <AppContainer>
        <DanceArea angle={this.state.angle} distance={this.state.distance}/>
        <Controls angle={this.state.angle} distance={this.state.distance} set={this.setState.bind(this)}/>
      </AppContainer>
    );
  }
}

export default App;
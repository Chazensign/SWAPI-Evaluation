import React from 'react'
import styled from 'styled-components'
import PeopleDisplay from './PeopleDisplay'

function App() {
  return (
    <AppStyle>
      <PeopleDisplay />
    </AppStyle>
  );
}

export default App;

const AppStyle = styled.main`
  width: 100vw;
  height: 100vh;
  text-align: center;
  box-sizing: border-box;
  `

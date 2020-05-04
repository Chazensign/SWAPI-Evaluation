import React from 'react'
import styled from 'styled-components'
import MainDisplay from './MainDisplay'
import { HashRouter } from 'react-router-dom'

function App() {

  return (
    <HashRouter>
    <AppStyle>
      <MainDisplay />
    </AppStyle>
    </HashRouter>
  )
}

export default App;

const AppStyle = styled.main`
  width: 100vw;
  height: 100vh;
  text-align: center;
  box-sizing: border-box;
  background-image: url('https://wallpaperplay.com/walls/full/2/9/2/124128.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  color: yellow;
  contain: content;
`

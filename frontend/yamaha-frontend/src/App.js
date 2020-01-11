import React from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { theme } from './config/theme'
import { Home } from './pages/Home'

let GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: ${theme.text.fontFamily};
  }
  
  html {
    background-color: ${theme.bgColor};
  }

  body {
    padding: 0;
    margin: 0;
  }

  a {
    text-decoration: none;
  }
`

const AppWrapper = styled('div')`
  /* width: 100%; */
  border-radius: 50px;
  background: linear-gradient(145deg, #97e3e5, #7fbfc1);
  box-shadow: 19px 19px 53px #6da3a5, 
              -19px -19px 53px #adffff;
  
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto 1fr auto;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin: 5vh 5%;
  min-height: calc(100vh - 10vh);
`

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppWrapper>
        <Home />
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;

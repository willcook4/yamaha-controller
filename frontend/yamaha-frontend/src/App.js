import React, { useState } from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { theme } from './config/theme'
import { Home } from './pages/Home'
import { Button } from './components/Button'
import { Switch } from './components/Switch'
import { Icon } from './icons'

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
  border-radius: 20px;

  background: ${`linear-gradient(145deg, ${theme.lightColor}, ${theme.darkColor})`};
  box-shadow: ${`29px 29px 58px ${theme.boxShadowLight}`}, 
              ${`-29px -29px 58px ${theme.boxShadowDark}`};

  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin: 5vh 5%;
  min-height: calc(100vh - 10vh);
`

const Title = styled('p')`
  text-align: center;
  font-weight: bold;
  color: steelblue;
  padding-top: 20px;
  margin-bottom: 18px;
`

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 18px;
  ${props => props.settings && 
    `border: 1px solid lightgrey;
    border-radius: 12px;
    margin: 0 10px;
    div {
      margin: 10px 0;
      div { 
        margin-top: -10px;
      }
      p {
        text-align: center;
        max-width: 116px;
      }
    }`
  }
`

const StyledWarning = styled('p')`
  text-align: center;
  color: steelblue;
  margin: 20px 0;
`

const BottomButtonWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 18px;
`

// Which zones to show

const MAINZONEACTIVE = true
const ZONE2ACTIVE = true

function App() {
  const [showSettings, setShowSettings] = useState(false)
  const [mainZoneActive, setMainZoneActive] = useState(MAINZONEACTIVE)
  const [zone2Active, setZone2Active] = useState(ZONE2ACTIVE)

  let Settings = (
    <>
    <Wrapper settings>
      <h3>Settings</h3>
      <div>
        <p>Show{mainZoneActive && 'ing'} Main Zone</p>
        <Switch
          name='main-zone'
          onChange={(e) => setMainZoneActive(e.target.checked)}
          defaultValue={mainZoneActive} />
      </div>
      <div>
        <p>Show{zone2Active && 'ing'} Zone 2</p>
        <Switch
          name='second-zone'
          onChange={(e) => setZone2Active(e.target.checked)}
          defaultValue={zone2Active} />
      </div>
    </Wrapper>
      <BottomButtonWrapper>
        <Button
          btnIcon={<Icon name='back' fill={'grey'} width={36} />} 
          btnText="Back"
          onClick={() => setShowSettings(false)} />
      </BottomButtonWrapper>
    </>
  )

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppWrapper>
        <Title>AV Control</Title>

        {!mainZoneActive && !zone2Active && (<StyledWarning>No zones active</StyledWarning>)}

        { showSettings ? Settings : 
        (
        <>
          <Home
            mainZoneActive={mainZoneActive}
            zone2Active={zone2Active} />

          <Wrapper>
            <Button 
              onClick={() => setShowSettings(!showSettings)}
              btnIcon={<Icon name="settings" fill={'grey'} active="TODO" width={30} />}
              btnText='Settings' />
          </Wrapper>
        </>
        )}

      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;

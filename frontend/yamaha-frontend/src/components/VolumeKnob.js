import React, { Component } from 'react'
import styled from 'styled-components'

const KnobSurround = styled('div')`
  position: relative;
  background-color: grey;
  width: 14em;
  height: 14em;
  border-radius: 50%;
  border: solid .25em darken(#181818, 4%);
  margin: 5em auto;
  .gradient {
    /* TODO */
  }
  .box-shodow {
    /* TODO */
  }
`

const Knob = styled('div')`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  z-index: 10;

  &::before {
    content: '';
    position: absolute;
    bottom: 19%;
    left: 19%;
    width: 3%;
    height: 3%;
    background-color: yellow;
    border-radius: 50%;
  }
`
const Label = styled('span')`
  display: block;
  font-family: sans-serif;
  color: black;
  text-transform: uppercase;
  font-size: 70%;
  position: absolute;
  opacity: 0.5;
  bottom: 1em;
`

const Min = styled(Label)`
  left: -2.5em;
`

const Max = styled(Label)`
  right: -2.5em;
`

class VolumeKnob extends Component {
  render() {
    return (
      <KnobSurround className='knob-surround'>
        <Knob className='knob' onMouseMove={(e) => {
          console.log('e', e)
        }}/>
        <Min>Min</Min>
        <Max>Max</Max>
      </KnobSurround>
    );
  }
}

export {
  VolumeKnob
}

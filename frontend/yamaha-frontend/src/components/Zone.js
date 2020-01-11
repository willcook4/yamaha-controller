import React from 'react'
import { ZoneProvider, useZoneState, useZoneDispatch } from './ZoneContext'
import { Volume } from '../components/Volume'

const ZoneInfo = ({name}) => {
  const { isOn } = useZoneState()
  return (
    <>
      <h3>Zone: {name}</h3>
      {/* <p>Volume: {vol}</p> */}
      <p>State: {isOn ? 'ON' : 'OFF'}</p>
    </>
  )
}

const Zone = (props) => {
  return (
    <ZoneProvider>
      <ZoneInfo name={props.name} />
      <Volume name={props.name} />
    </ZoneProvider>
  )
}



export { Zone, useZoneDispatch }
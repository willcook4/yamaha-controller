import React, { useState } from 'react'
import Api from '../lib/Api'
import { useZoneState, useZoneDispatch } from './ZoneContext'

/**
 * Power
 * 
 * - Reports the power status of a zone
 * - Controls the power status for a zone
 */

 const Power = (props) => {
  const { isOn } = useZoneState()
  const dispatch = useZoneDispatch()

  const [errMsg, setErrMsg] = useState('')  

  async function togglePower(zone, action) {
    try {
      let apiResponse = await Api.togglePowerForZone(zone, action)
      dispatch({type: action, isOn: apiResponse.data.isOn})
    } catch(error) {
      setErrMsg(error.response.data.message)
    }
  }

  return (
    <>
      <p>Power state for {props.zoneName}:</p>
      <p>{isOn ? 'ON' : 'OFF'}</p>
      {errMsg}
      <button onClick={() => {
        let action = isOn ? 'power-off' : 'power-on'
        togglePower(props.zoneName, action)
      }}>Turn {isOn ? 'OFF' : 'ON'}</button>
    </>
  )
 }

 export { Power }
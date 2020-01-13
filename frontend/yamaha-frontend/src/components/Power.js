import React, { useState } from 'react'
import Api from '../lib/Api'
import { useZoneState, useZoneDispatch } from './ZoneContext'
import { Button } from '../components/Button'
import { Icon } from '../icons'

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
      <p>{isOn ? 'ON' : 'OFF'}</p>
      {errMsg}
      <Button
        btnIcon={<Icon name="power" fill={'grey'} active="TODO" width={40} />}
        btnText={isOn ? 'Turn OFF' : 'Turn ON'}
        onClick={() => {
          let action = isOn ? 'power-off' : 'power-on'
          togglePower(props.zoneName, action)
        }} />
    </>
  )
 }

 export { Power }
import React, { useState } from 'react'
import axios from 'axios'

import { useZoneState, useZoneDispatch, VOLUME_INCREMENT } from './ZoneContext'
// import Api from '../lib/Api'


export function Volume({name}) {
  const [disabled, setDisabled] = useState(false)
  const dispatch = useZoneDispatch()
  const { vol } = useZoneState()

  /**
   * 
   * @param {String} direction 'UP || 'DOWN
   * @param {String} name Zone name, e.g. 'Main_Zone'
   */
  async function changeVolume (direction, name) {
    setDisabled(true)
    console.log('Change vol called: ', direction)
    let actionType = 'vol-down'
    if(direction === 'UP'){
      actionType = 'vol-up'
    }

    let endpoint = 'http://localhost:9000/audio/receiver/volume'
    let data = {
      direction,
      amount: VOLUME_INCREMENT,
      zone: name
    }
    
    try {
      let apiResponse = await axios.post(endpoint, data)
      console.log('apiResp: ', apiResponse)
      dispatch({type: actionType, newVolume: apiResponse.data.newVolume })
      
    } catch (err) {
      console.log('error.response: ', err.response)
    }
    setDisabled(false)
  }

  console.log()
  return (
    <div>
      <p>Current volume: {vol}</p>
      <p>Zone: {name}</p>
      <button
        disabled={disabled}
        onClick={() => changeVolume('UP', name)}
      >Increase</button>
      
      <br/>

      <button
        disabled={disabled}
        onClick={() => changeVolume('DOWN', name)}
      >Decrease</button>

      <button
        disabled={disabled}
        onClick={() => changeVolume('MUTE', name)}
      >Mute</button>
    </div>
  );
}

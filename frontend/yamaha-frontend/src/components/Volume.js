import React, { useState } from 'react'
import { useZoneState, useZoneDispatch, VOLUME_INCREMENT } from './ZoneContext'
import Api from '../lib/Api'
import { VolumeControl } from '../components/VolumeControl'

export function Volume({ zoneName }) {
  const [disabled, setDisabled] = useState(false) // eslint-disable-line
  const dispatch = useZoneDispatch()
  const { vol, isMuted } = useZoneState()
  
  /**
   * 
   * @param {String} direction 'UP || 'DOWN
   * @param {String} zoneName Zone zoneName, e.g. 'Main_Zone'
   */
  async function changeVolume (direction, zoneName) {
    setDisabled(true)
    console.log('Change vol called: ', direction)
    let actionType = 'vol-down'
    if(direction === 'UP'){
      actionType = 'vol-up'
    }
    
    try {
      let apiResponse = await Api.changeVolume(direction, VOLUME_INCREMENT, zoneName)
      // Update the UI with the new volume
      dispatch({type: actionType, newVolume: apiResponse.data.newVolume })
      
    } catch (err) {
      console.log('error.response: ', err.response)
    }
    setDisabled(false)
    // TODO update the UI with a blink like a IR remote 
  }

  /**
   * 
   * @param {String} zone 
   * @param {String} action 'MUTE' || 'UNMUTE'
   */
  async function toggleMute(action, zone){
    setDisabled(true)
    try {
      let apiResponse = await Api.toggleMuteZone(zone, action)
      dispatch({ type: action, newVolume: apiResponse.data.newVolume, isMuted: apiResponse.data.isMuted })
    } catch(err) {
      console.log('mute err.response: ', err.response)
    }
    setDisabled(false)
  }

  let volAsPercent = Math.round(((800 - (vol * -1)) / 800) * 100)
  return (
      // <p>Current volume: {isMuted ? `MUTED (${vol})` : vol} [{volAsPercent}%]</p>
      
      /* <p>Zone: {zoneName}</p>
      {/* <button
        disabled={disabled}
        onClick={() => changeVolume('UP', zoneName)}
      >Increase</button>
      
      <br/>

      <button
        disabled={disabled}
        onClick={() => changeVolume('DOWN', zoneName)}
      >Decrease</button>

      <button
        disabled={disabled}
        onClick={() => toggleMute(isMuted ? 'UNMUTE' : 'MUTE', zoneName)}
      >{isMuted ? 'UNMUTE' : 'MUTE'}</button>
        {/* {isMuted ? 'Muted' : 'unmuted'}
      {/* <hr />  */

    <VolumeControl
      volume={volAsPercent}
      isMuted={isMuted} 
      volumeDown={() => changeVolume('DOWN', zoneName)}
      volumeUp={() => changeVolume('UP', zoneName)}
      toggleMute={() => toggleMute(isMuted ? 'UNMUTE' : 'MUTE', zoneName)}
    />
  );
}

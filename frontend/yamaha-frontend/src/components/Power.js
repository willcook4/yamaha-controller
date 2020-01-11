import React, { useState, useEffect } from 'react'
import Api from '../lib/Api'

// const Power = (props) => {

// return [(<p>TEsting {powerState} {props.zone}</p>), setPowerState]
// }

/**
 * Power
 * 
 * - Reports the power status of a zone
 * - Controls the power status for a zone
 */

 const Power = (props) => {
  const [powerState, setPowerState] = useState('NOT SURE')
  return [(
    <p>Power state for {props.zone}: {powerState}</p>
  ), setPowerState]
 }

 export { Power }
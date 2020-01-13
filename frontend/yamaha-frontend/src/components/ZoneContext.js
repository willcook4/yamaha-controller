/**
 * Zone shares the info for the zone of the receiver
 * 
 * inspired by: https://kentcdodds.com/blog/how-to-use-react-context-effectively
 */

import React from 'react'

const ZoneStateContext = React.createContext()
const ZoneDispatchContext = React.createContext()

// Amount volume goes up or down by each time you change
export const VOLUME_INCREMENT = 10

function zoneReducer(currentState, action) {
  switch(action.type) {
    case 'vol-up': 
    case 'vol-down':
      return {// new state
        ...currentState,
        vol: action.newVolume,
      }
    case 'MUTE':
    case 'UNMUTE':
      return {
        ...currentState,
        vol: action.newVolume, // -80db === MUTE === 0% volume
        isMuted: action.isMuted,
      }
    case 'power-off':
    case 'power-on':
      return {
        ...currentState,
        isOn: action.isOn
      }
    case 'set-all-states':
      return {
        ...currentState,
        vol: action.vol,
        isOn: action.isOn,
        isMuted: action.isMuted,
        zoneCurrentInput: action.zoneCurrentInput
      }

    default: 
      throw new Error(`Unhandled action type: ${action.type}`)
    }
}

function ZoneProvider({children}) {     
  /* NOTE:  vol:  -35db === -350 , 0db is Max volume */
  // const [state, dispatch] = React.useReducer(zoneReducer, { vol: -800,  isOn: false, isMuted: false })
  const [state, dispatch] = React.useReducer(zoneReducer, {})
  return (
    <ZoneStateContext.Provider value={state}>
      <ZoneDispatchContext.Provider value={dispatch}>
        {children}
      </ZoneDispatchContext.Provider>
    </ZoneStateContext.Provider>
  )
}

function useZoneState() {
  const context = React.useContext(ZoneStateContext)
  if (context === undefined) {
    throw new Error('useZoneState must be used within a ZoneProvider')
  }
  return context
}

function useZoneDispatch() {
  const context = React.useContext(ZoneDispatchContext)
  if (context === undefined) {
    throw new Error('useZoneDispatch must be used within a ZoneProvider')
  }
  return context
}

export { ZoneProvider, useZoneState, useZoneDispatch }

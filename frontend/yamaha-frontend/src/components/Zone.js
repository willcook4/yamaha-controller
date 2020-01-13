import React, { useState, useEffect }from 'react'
import styled from 'styled-components'

import { ZoneProvider, useZoneState, useZoneDispatch } from './ZoneContext'
import { Volume } from '../components/Volume'
import { Power } from '../components/Power'
import Api from '../lib/Api'
import { Icon } from '../icons'
import { Button } from '../components/Button'
import { SourceSelect } from '../components/SourceSelect'

// Pattern ref: https://levelup.gitconnected.com/fetch-an-api-with-react-hooks-79d509a052a0
// and https://www.robinwieruch.de/react-hooks-fetch-data

const ZoneInfo = ({zoneName}) => {
  return (
    <h3>{zoneName}</h3>
  )
}

const Zone = (props) => {
  return (
    <ZoneProvider zoneName={props.name}>
      <ZoneSetup zoneName={props.name} />
    </ZoneProvider>
  )
}

const ZoneWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid lightgrey;
  margin: 10px;
`

const Loading = styled('p')`
  text-align: center;
  color: gray;
  margin: 20px 0;
`

const ErrorMsg = styled('p')`
  color: grey;
  text-align: center;
  margin-top: 12px;
  margin-bottom: 12px;
`

const ZoneSetup = (props) => {
  const [getStatus, setGetStatus] = useState(true)
  const [errMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useZoneDispatch()
  const { isOn } = useZoneState()
  
  useEffect(() => {
    async function getReceiverState(zone) {
      setLoading(true)
      try {
        let receiverStatus = await Api.getCurrentInfo(zone)
        console.log('RECEIVER STATUS: ', receiverStatus)
        dispatch({
          type: 'set-all-states', 
          vol: receiverStatus.data.zoneVol,
          isOn: receiverStatus.data.zoneON,
          isMuted: receiverStatus.data.zoneMuted,
          zoneCurrentInput: receiverStatus.data.zoneCurrentInput
        })
        setGetStatus(false)
      } catch (err) {      
        setErrorMsg(err.response.data.message)
      }
      setLoading(false)
    }

    getReceiverState(props.zoneName)
  }, [getStatus, props.zoneName, dispatch]) 
  // [] === never needs to re-run, only on component did mount
  // [getStatus] === will get the status if getStatus is true
  //  props.zoneName, dispatch are dependencies for getReciver state and are required see,
  // https://reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies
  
  if(loading) return <Loading>Loading {props.zoneName}...</Loading>

  return (
    <ZoneWrapper>
      <Button 
        onClick={() => setGetStatus(true)}
        btnText="Refresh"
        btnIcon={<Icon name="refresh" fill={'grey'} active="TODO" width={30} />}
      />

      <ZoneInfo zoneName={props.zoneName} /> {/* Displays zone information */}
      <Power zoneName={props.zoneName} /> 
      {errMsg ? (<ErrorMsg>{errMsg}</ErrorMsg>) : (
      <>
        {isOn && (<>
                    <Volume zoneName={props.zoneName} />
                    <SourceSelect zoneName={props.zoneName} />
                  </>)}
        
      </>)}
    </ZoneWrapper>
  )
}

export { Zone }
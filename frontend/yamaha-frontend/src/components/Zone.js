import React, { useState, useEffect }from 'react'
import { ZoneProvider, useZoneState, useZoneDispatch } from './ZoneContext'
import { Volume } from '../components/Volume'
import { Power } from '../components/Power'
import Api from '../lib/Api'

// Pattern ref: https://levelup.gitconnected.com/fetch-an-api-with-react-hooks-79d509a052a0

const ZoneInfo = ({zoneName}) => {
  return (
    <>
      <h3>Zone: {zoneName}</h3>
    </>
  )
}

const Zone = (props) => {
  return (
    <ZoneProvider zoneName={props.name}>
      <ZoneSetup zoneName={props.name} />
    </ZoneProvider>
  )
}

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
          isMuted: receiverStatus.data.zoneMuted
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
  
  if(errMsg) return <p>{errMsg}</p>
  if(loading) return <p>Loading</p>
  return (
    <>
      <button onClick={() => setGetStatus(true)}>Refresh zone info</button>
      <ZoneInfo zoneName={props.zoneName} /> {/* Displays zone information */}
      {isOn && <Volume zoneName={props.zoneName} />}
      <Power zoneName={props.zoneName} />
    </>
  )
}



export { Zone }
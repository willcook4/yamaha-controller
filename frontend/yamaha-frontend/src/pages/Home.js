import React /* { useState, useEffect } */ from 'react'
// import Api from '../lib/Api'
// // import axios from 'axios'
import { Zone } from '../components/Zone'
// import { Power, setPowerState } from '../components/Power'

/**
 * 
 * Home
 * 
 * Manages Zone status and passes data to components as props
 */

export const Home = (props) => {
//   const [zone, setZone] = useState('Main_Zone')
//   const [gotReceiverInfo, setGotReceiverInfo] = useState(null)
//   const [errorMsg, setIsErrorMsg] = useState(null)
//   const [isLoading, setIsLoading] = useState('')
//   const [zoneVol, setZoneVol] = useState(-80) // range -800 <-> 0
//   const [zoneSource, setZoneSource] = useState(null)

//   useEffect(() => {
//     async function getReceiverStatus(zone) {
//       setIsErrorMsg(false)
//       setIsLoading(true)
//       console.log('getReceiverStatus for ', zone)
//       try {
//         console.log(receiverStatus)
//         let receiverStatus = await Api.getCurrentInfo(zone) 
//         setPowerState(receiverStatus.data.zoneON)
//         setZoneVol(receiverStatus.data.zoneVol)
//         setZoneSource(receiverStatus.data.zoneCurrentInput)
//       } catch (error) {
//         consoe
//         console.log('error.response: ', error.response)
//         if(error.response.data && error.response.data.code && error.response.data.message) {
//           if(error.response.data.code === "app.logic.error") {
//             if(error.response.data.message === 'Unable to connect to the receiver') {
//               setIsErrorMsg(error.response.data.message + ', try refreshing or check the network connections')
//             }
//           }
//         }
//       }
//       setGotReceiverInfo(true)
//       setIsLoading(false)
//     }
//     getReceiverStatus(zone)
//   }, [gotReceiverInfo, zone])

//   console.log('ERROR: ', errorMsg)
//   console.log('Zone: ', zone)
//   console.log('isLoading: ', isLoading)
//   console.log('powerState: ', powerState)
//   console.log('RENDER')

//   if(errorMsg) return (<>
//                         <p>{errorMsg}</p>
//                         <button onClick={() => {
//                           setGotReceiverInfo(false)
//                           console.log('TODO')
//                           }}>Click here to try again</button>
//                        </>)

//   let volAsPercent = Math.round(((800 - (zoneVol * -1)) / 800) * 100)

  return ( 
    <>      
      <div style={{marginTop: '20px'}}>
        <Zone name={'Main_Zone'} />
      </div>
      <div style={{marginTop: '20px'}}>
        <Zone name={'Zone_2'} />
      </div>
    </>
  )
}



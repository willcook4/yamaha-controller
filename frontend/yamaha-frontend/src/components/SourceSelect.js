import React, { useState } from 'react'
// import styled from 'styled-components'
import Modal from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import { useZoneState, useZoneDispatch } from './ZoneContext'
import { Icon } from '../icons'
import { Button } from '../components/Button'
import Api from '../lib/Api'

// title is the frontend viewing name
// receiverName is the name of the input on the receiver 
const sources = [{
  icon: (<Icon width={30} name='envelope' fill='grey'/>),
  title: 'Turntable',
  receiverName: 'PHONO'
}, {
  icon: (<Icon width={30} name='envelope' fill='grey'/>),
  title: 'Radio',
  receiverName: 'TUNER'
}, {
  icon: (<Icon width={30} name='envelope' fill='grey'/>),
  title: 'iMac',
  receiverName: 'AUDIO1'
}, {
  icon: (<Icon width={30} name='envelope' fill='grey'/>),
  title: 'Airplay',
  receiverName: 'AirPlay'
}, {
  icon: (<Icon width={30} name='envelope' fill='grey'/>),
  title: 'Aux',
  receiverName: 'AUDIO2'
}]

// A title could be 'Aux' but the receiver calls this 'AUDIO2'
function convertRecieverInputToTitle (receiverInput) {
  let match = sources.filter(input => {
    if(input.receiverName === receiverInput){
      return input
    }
    return false
  })
  if(match.length > 0){
    return match[0].title
  }
  return null
}

export const SourceSelect = (props) => {
  const { zoneCurrentInput } = useZoneState()
  const [showOptions, setShowOptions] = useState(false)
  const [loading, setLoading] = useState(false)
  let zoneInputTitle = convertRecieverInputToTitle(zoneCurrentInput)
  const dispatch = useZoneDispatch()

  if(loading) return <p>Loading</p>
  return (
    <>
      <p style={{color: 'grey', margin: '10px auto'}}>Current input: {zoneInputTitle}</p>
      <Modal
        open={showOptions}
        onClose={() => setShowOptions(!showOptions)}
        center
        showCloseIcon={false}
        styles={{
          overlay: {
            padding: 'unset'
          },
          modal: {
            margin: 'auto',
            minWidth: '100%',
            minHeight: '100%',
            padding: 'unset',
            background: 'unset',
            backgroundClip: 'unset'
          }}}>
        <div style={{
          background: "linear-gradient(145deg, #e9f0f8 , #c4cad1)",
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100vh',
          justifyContent: 'center'
        }}>
          <p style={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'steelblue',
            paddingTop: '20px',
            marginBottom: '-20px'}}>Select input for {props.zoneName}</p>
          <ul style={{
            listStyle: 'none'
          }}>
            {sources.map(source => {
              return (
                <li
                  key={source.receiverName}
                  style={{ margin: '40px 0'}}
                  >
                  <Button
                    btnText={source.title}
                    onClick={async () => {
                      setLoading(true)
                      
                      try {
                        let apiResponse = await Api.setZoneSource(source.receiverName, props.zoneName)
                        // Update the UI with the new volume
                        dispatch({type: 'change-source', zoneCurrentInput: apiResponse.data.inputSelected })
                      } catch (err) {
                        console.log('error.response: ', err.response)
                      }

                      setShowOptions(!showOptions)
                      setLoading(false)
                    }} />
                </li>)
            })}
          </ul>
        </div>
      </Modal>
      <Button
        btnText='Change Source'
        onClick={() => setShowOptions(!showOptions)} />      
    </>
  )
}
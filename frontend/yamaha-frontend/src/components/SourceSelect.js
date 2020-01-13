import React, { useState } from 'react'
import styled from 'styled-components'
import Modal from 'react-responsive-modal'
import { useZoneState, useZoneDispatch } from './ZoneContext'
import { Icon } from '../icons'
import { Button } from '../components/Button'

const sources = [{
  icon: (<Icon width={30} name='envelope' fill='grey'/>),
  title: 'Phono',
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
}]

export const SourceSelect = (props) => {
  const { zoneCurrentInput } = useZoneState()
  const [showOptions, setShowOptions] = useState(false)
  return (
    <>
      <p>Current input: {zoneCurrentInput}</p>
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
          height: '100vh'
        }}>
          <ul>
            {sources.map(source => {
              return (
                <div key={source.receiverName}>
                  <Button
                    btnText={source.title}
                    onClick={() => {
                      console.log(`clicked on ${source.receiverName}`)
                      setShowOptions(!showOptions)
                    }} />
                </div>)
            })}
          </ul>
        </div>
      </Modal>
      <Button
        btnText='Source'
        onClick={() => setShowOptions(!showOptions)} />      
    </>
  )
}
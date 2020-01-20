import React from 'react'
import styled from 'styled-components'
import { Zone } from '../components/Zone'

const Wrapper = styled('div')`
  border: 0.5px solid lightgrey;
  border-radius: 10px;
  margin: auto 12px;

  div:last-of-type {
    /* border-bottom: none; */
  }
`

/**
 * 
 * Home
 * 
 * Shows zones and passes zone name
 */

export const Home = (props) => {
  return ( 
    <Wrapper>
      {props.mainZoneActive && <Zone name={'Main_Zone'} />}       
      {props.zone2Active && <Zone name={'Zone_2'} />}
    </Wrapper>
  )
}



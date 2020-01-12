import React from 'react'
import { Zone } from '../components/Zone'

/**
 * 
 * Home
 * 
 * Manages Zone selection and passes zone name
 */

export const Home = () => {
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



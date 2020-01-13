import React from "react"

import { Envelope } from "./Envelope"
import { Settings } from "./Settings"
import { Refresh } from './Refresh'
import { Power } from './Power'
import { Back } from './Back'

export const Icon = props => {
  switch (props.name) {
    case "envelope":
      return <Envelope {...props} />
    case "settings":
      return <Settings {...props} />
    case "refresh":
      return <Refresh {...props} />
    case 'power':
      return <Power {...props} />
    case 'back':
      return <Back {...props} />
    default:
      return
  }
}

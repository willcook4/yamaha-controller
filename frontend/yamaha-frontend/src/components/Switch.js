import React, { useState } from 'react'
import styled from 'styled-components'

// Prior art from https://codepen.io/mburnette/details/LxNxNg

const StyledSwitch = styled('div')`
  input[type=checkbox]{
    height: 0;
    width: 0;
    visibility: hidden;
  }

  label {
    cursor: pointer;
    text-indent: -9999px;
    width: 116px;
    height: 63px;
    background: linear-gradient(145deg, grey, lightgrey);
    display: block;
    border-radius: 63px;
    position: relative;
  }

  label:after {
    content: '';
    position: absolute;
    top: 6.5px;
    left: 5px;
    width: 45px;
    height: 50px;
    background: linear-gradient(145deg, #e9f0f8, #c4cad1);
    border-radius: 50%;
    transition: 0.3s;
  }

  input:checked + label {
    background: steelblue;
  }

  input:checked + label:after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }

  label:active:after {
    width: 130px;
  }
`

export const Switch = (props) => {
  const [isChecked, setIsChecked] = useState(props.defaultValue)

  return (
    <StyledSwitch size={props.size}>
      <input
        type="checkbox"
        id={`switch-${props.name}`}
        onChange={(e) => {
          setIsChecked(!isChecked)
          props.onChange(e)
        }}
      checked={isChecked} 
      />
      <label htmlFor={`switch-${props.name}`}></label>
      <span>{props.switchText}</span>
    </StyledSwitch>
  ) 
}


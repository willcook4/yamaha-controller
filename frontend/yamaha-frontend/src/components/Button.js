import React from 'react'
import styled from 'styled-components'

//  Theme color: #dae0e8
//  https://neumorphism.io/#dae0e8

const StyledButton = styled('button')`
  width: 135px;
  height: 60px;
  border-radius: 20px;
  border: none;
  color: grey;
  font-weight: bold;
  margin: 10px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  span {
    ${props => props.textLeft ? 'margin-right: 4px' : ''};
    ${props => props.textRight ? 'margin-left: 4px' : ''};
  }
  ${props => props.textTop || props.textBottom ? 'svg { display: block; margin: auto; }' : ''}

  ${props => props.pressed ? `
    background: linear-gradient(145deg, #c4cad1, #e9f0f8);
    box-shadow: 6px 6px 12px #b9bec5, 
                -6px -6px 12px #fbffff;
    ` : `
    background: linear-gradient(145deg, #e9f0f8, #c4cad1);
    box-shadow: 6px 6px 12px #b9bec5, 
            -6px -6px 12px #fbffff;
  `}

  ${props => props.btnAlert ? 
    `color: firebrick;
     background: radial-gradient(circle,rgba(224,162,162,1) 0%,rgba(218,224,232,1) 71%);
    ` 
    : `color: grey;`}

  &:focus {
    outline: none;
  }
  &:active {
    color: teal;
    
    /* If pressed then inverse the background and box shadow */
    ${props => props.pressed ? `
       background: linear-gradient(145deg, #e9f0f8, #c4cad1);` :
      `
      background: linear-gradient(145deg, #c4cad1, #e9f0f8);`
    }
  }
`

export const Button = (props) => {
  // TODO refactor to CSS
  if(props.textRight) {
    return (
    <StyledButton {...props}>
      <div style={{ display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'}}>
        {props.btnIcon}              
        <span style={{alignSelf: 'center'}}>{props.btnText}</span>
      </div>
    </StyledButton>)
  }
  if(props.textLeft) {
    return (
    <StyledButton {...props}>
      <div style={{ display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'}}>
        <span style={{alignSelf: 'center'}}>{props.btnText}</span>
        {props.btnIcon}              
      </div>
    </StyledButton>)
  }

  if(props.textTop) {
    return (
      <StyledButton {...props}>
        <span style={{ alignSelf: 'center' }}>{props.btnText}</span>
        {props.btnIcon}
      </StyledButton>)
  }

  return (
    <StyledButton {...props}>
      {props.btnIcon}
      {props.btnText}
    </StyledButton>
  )
  
}


/**
 * Samples
 * 
 */   
 
//       {/* Plain text button */}
//       <Button btnText={'Sample'} />
      
//       {/* Alert button */}
//       <Button btnAlert={true} btnText={'Alert'} />
      
//       {/* Icon */}
//       <Button btnIcon={(<Icon name="envelope" width={60} fill={'darkgrey'} />)} />
      
//       {/* Icon + btnText Left */}
//       <Button 
//         textRight
//         btnText="Demo"
//         btnIcon={(<Icon name="envelope" width={30} fill={'darkgrey'} />)} />
      
//       {/* Icon + btnText Right */}
//       <Button 
//         textLeft
//         btnText="Demo"
//         btnIcon={(<Icon name="envelope" width={30} fill={'darkgrey'} />)} />
      
//       {/* Icon + btnText Top */}
//       <Button 
//         textTop
//         btnText="Demo"
//         btnIcon={(<Icon name="envelope" width={30} fill={'darkgrey'} />)} />
      
//       {/* Icon + btnText Bottom */}
//       <Button 
//         textBottom
//         btnText="Demo"
//         btnIcon={(<Icon name="envelope" width={30} fill={'darkgrey'} />)} />

//       {/* Pressed */}
//       <Button 
//         pressed
//         btnText={'Sample'} />
      
//       {/* Clickable when pressed */}
//       <Button onClick={() => console.log('Clicked btn')} btnText="Test" />
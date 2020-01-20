import React, { Component , useState} from 'react'
import styled from 'styled-components'

// based off Knob/Dial(React) codepen.io/bbx/pen/QBKYOy

const Ticks = styled('div')`
  position: absolute;
`

const Tick = styled('div')`
  position: absolute;
  /* background-color: black; */
  background-color: ${props => props.active ? 'steelblue' : 'grey'};
  /* box-shadow: ${props => props.active ? 'inset 0 0 5px 2px #509eec, 0 0 0 1px #369' : 'inset 0 0 0 0 black'}; */
  width: 3px;
  /* transition: box-shadow 0.5s; */
  height: ${props => props.tickStyle.height + 'px'}; 
  left: ${props => props.tickStyle.left + 'px'};
  top: ${props => props.tickStyle.top + 'px'};
  transform: ${props => props.tickStyle.transform};
  transform-origin: center top;
`

const StyledKnob = styled('div')`
  display: flex;
  position: relative;
  width: 200px;
  height: 200px;
  margin-top: 20px;
`

const KnobOuter = styled('div')`
  position: relative;
  display: flex;
  border-radius: 50%;
  background: linear-gradient(145deg, #e9f0f8, #c4cad1);
  /* box-shadow: 20px 14px 30px #7b8086, -6px -6px 12px #fbffff; */
  box-shadow: 20px 14px 30px #7b8086, -13px -22px 36px #f2f7f9;
  width: ${props => props.size + 'px'};
  height: ${props => props.size + 'px'};
  margin: ${props => props.margin + 'px'};
`

const KnobInner = styled('div')`
  width: ${props => props.size + 'px'};
  height: ${props => props.size + 'px'};
  transform: ${props => `rotate(${props.rotation}deg)`};
`

const Grip = styled('div')`
  position: absolute;
  width: 8%;
  height: 8%;
  bottom: 6%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  background-color: #509eec;
  box-shadow: inset 0 0 3px 1px whitesmoke;
`

const VolumeText = styled('p')`
  position: absolute;
  text-align: center;
  width: inherit;
  margin-top: 50px;
  color: steelblue;
  font-size: 2.4em;
  font-family: sans-serif;
  font-variant-numeric: tabular-nums;
  &::after {
    content: '%';
    font-family: sans-serif;
    font-size: 20px;
  }
`

class Knob extends Component {
  constructor(props){
    super(props)
    this.fullAngle = props.degrees
    this.margin = props.size * 0.15
    this.startAngle = (360 - props.degrees) / 2
    this.endAngle = this.startAngle + props.degrees
    this.currentDeg = Math.floor(
      this.convertRange(
        props.min,
        props.max,
        this.startAngle,
        this.endAngle,
        props.value
      )
    )
    this.state = {
      deg: this.currentDeg
    } 
  }

  convertRange = (oldMin, oldMax, newMin, newMax, oldValue) => {
    return (oldValue - oldMin) * (newMax - newMin) / (oldMax - oldMin) + newMin
  }

  createTicks = () => {
    let ticks = []
    const increment = this.fullAngle / this.props.numTicks
    const size = this.margin + (this.props.size / 2)
    for (let deg = this.startAngle; deg <= this.endAngle; deg += increment) {
      const tick = {
        deg: deg,
        tickStyle: {
          // height: size + 10,
          height: 100,
          left: size - 1,
          top: size + 2,
          transform: `rotate(${deg}deg)`,
        }
      }
      ticks.push(tick)
    }
    return ticks
  }

  startDrag = (e) => {
    console.log('hhhh')
    e.preventDefault()
    const knob = e.target.getBoundingClientRect()
    
    const pts = {
      x: knob.left + (knob.width / 2),
      y: knob.top + (knob.height / 2)
    }
    const moveHandler = (e) => {
      this.currentDeg = this.getDeg(e.clientX, e.clientY, pts)
      if (this.currentDeg === this.startAngle) {
        this.currentDeg--
      }
      let newValue = Math.floor(
        this.convertRange(
          this.startAngle,
          this.endAngle,
          this.props.min,
          this.props.max,
          this.currentDeg
        )
      )
      this.setState({ deg: this.currentDeg })
      this.props.onChange(newValue)
    }
    document.addEventListener("mousemove", moveHandler)
    document.addEventListener("mouseup", (e) => {
      document.removeEventListener("mousemove", moveHandler)
    })
  }

  getDeg = (cX, cY, pts) => {
    const x = cX - pts.x
    const y = cY - pts.y
    let deg = Math.atan(y / x) * 180 / Math.PI
    if((x < 0 && y >= 0) || (x < 0 && y < 0)) {
      deg += 90
    } else {
      deg += 270
    }
    let finalDeg = Math.min( Math.max(this.startAngle, deg), this.endAngle)
    return finalDeg
  }

  render() {
    // TODO ? color
    return (
      <StyledKnob
        size={this.props.size}
        className='styled-knob'>
        <Ticks className='ticks'>
          {this.props.numTicks && this.createTicks().map((tick, i) => (
            <Tick
              key={`tick-${i}`}
              className={`tick ${tick.deg <= this.currentDeg ? 'active' : ''}`}
              tickStyle={tick.tickStyle}
              active={(tick.deg <= this.currentDeg) ? true : null}
            />
          ))}
        </Ticks>
        <KnobOuter
          size={this.props.size}
          className='knob-outer'
          onMouseDown={this.startDrag}
          // onTouchMove={() => console.log('todo')}
          margin={this.margin}
          >
          <KnobInner
            className='knob-inner'
            size={this.props.size}
            rotation={this.state.deg}
          >
            <Grip className='grip' />
          </KnobInner>
          <VolumeText>{this.props.value}</VolumeText>
        </KnobOuter>
      </StyledKnob>
    )
  }
}

Knob.defaultProps = {
  size: 150,
  numTicks: 0,
  degrees: 270,
  min: 10,
  max: 30,
  value: 0
}


const VolumeKnob = () => {
  const [value, setValue] = useState(0)

  return (    
    <Knob
      className='knob'
      size={150}
      numTicks={26} 
      degrees={270}
      min={0}
      max={100}
      value={value}
      onChange={(newValue) => {
        setValue(newValue)
      }}
    />
  )
}

export {
  VolumeKnob
}

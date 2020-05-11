import React, { Component } from 'react'
import styled from 'styled-components'
// import { VOLUME_INCREMENT } from '../components/ZoneContext'

const Thermostat = styled('div')`
  margin-top: 230px;
  margin-bottom: -160px;
  align-self: flex-end;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  width: 400px;
  height: 400px;
  /* background: #6D697F; */
  background: linear-gradient(145deg, #e9f0f8, #c4cad1);
  /* box-shadow: inset 0px -6px 1px 2px rgba(0,0,0,0.35), 0px 7px 40px 11px rgba(84, 81, 97, 0.40); */
  box-shadow: 29px 29px 58px #b9bec5, -29px -29px 58px #fbffff;

  .shadow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotateZ(10deg);
    width: 25px;
    height: 86%;
    text-align: center;
    transition: 0.7s ease;
    animation: shadow 1.4s ease-out both;
    .shadow-cube {
      position: absolute;
      top: 0;
      width: 25px;
      height: 0px;
      box-shadow: 0 0 45px 13px rgba(70, 130, 180, 0.6);
    }
  }
  
  .bar {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    width: 356px;
    height: 356px;
    .inner-bar {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 344px;
      height: 344px;
      margin-left: -172px;
      margin-top: -172px;
      border-radius: 100%;
      background-color: #6D697F;
      background: linear-gradient(145deg,#e9f0f8,#c4cad1);
      z-index: 4;
      &::after {
        content: '';
        display: block;
        position: absolute;
        width: 0;
        height: 0;
        border-top: 70px solid transparent;
        border-left: 70px solid transparent;
        border-right: 70px solid transparent;
        border-bottom: 150px solid #ccd2d9;
        bottom: -7px;
        left: 50%;
        transform: translatex(-50%);
      }
    }
    .hold {
      position: absolute;
      width: 100%;
      height: 100%;
      clip: rect(0px, 356px, 356px, 178px);
      border-radius: 100%;
      background-color: lightsteelblue;
    }
    
    .fill {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 100%;
      clip: rect(0px, 178px, 356px, 0px);
    }
    
    .fill1 {
      /* background: linear-gradient(top, #FF4900 20%, #FF4900 100%); */
      background-color: steelblue;
    }
    
    .fill2 {
      /* background: linear-gradient(top, #FF4900 40%, #FF9E23 100%); */
      background-color: violet;
    }

    .right {
      z-index: 3;
      /* transform: rotate(180deg); */
    }

    .right .fill {  
      z-index: 3;
      /* transform: rotate(180deg); */
      animation: right 1s linear both;
      transition: transform 0.6s;
    }

    .left .fill {
      z-index: 1;
      animation: left 0.3s linear both;
      animation-delay: 1s;
      transition: transform 0.6s;
    }
    
    span {
      width: 356px;
      font-weight: 800;
      position: absolute;
      bottom: 0px;
      text-align: center;
      text-transform: uppercase;
      font-size: 15px;
      color: steelblue;
      z-index: 10;
    }
  }
  .center {
    position: absolute;
    width: 260px;
    height: 260px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: linear-gradient(145deg, #e9f0f8, #c4cad1);
    box-shadow: 6px 6px 12px #b9bec5, -6px -6px 12px #fbffff;
    animation: bound-in 0.6s ease forwards;

    .mute {
      position: relative;
      text-align: center;
      top: 202px;
      color: #b9b6c8;
      display: block;
      font-size: 1.2em;
    }
    .muted {
      color: steelblue;
    }

    .arrow {
      position: absolute;
      color: #b9b6c8;
      font-size: 40px;
      font-weight: 500;
      line-height: 260px;
      cursor: pointer;
    }

    .minus {
      padding-left: 32px;
      padding-right: 32px;
      position: absolute;
      animation: arrow-left 1s forwards;
    }

    .plus {
      left: 172px;
      padding-left: 32px;
      padding-right: 50px;
      position: absolute;
      animation: arrow-right 1s forwards;
    }

    .small {
      position: absolute;
      width: 150px;
      height: 150px;
      /* background: #F8F9FA; */
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      text-align: center;
      animation: bound-in-small 0.6s ease forwards;
      .volume {
        line-height: 150px;
        font-size: 59px;
        color: steelblue;
        font-weight: 300;
        opacity: 0.6;
        &::after {
          content: '%';
          display: block;
          position: absolute;
          font-size: 20px;
          top: -12px;
          right: 22px;
          color: steelblue;
        }
      }
      .muted {
        color: lightgrey;
      }
    }
  }


@keyframes shadow {
  0% {
    transform: translate(-50%, -50%) rotate(-190deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(10deg);
  }
}

@keyframes right {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
}

@keyframes left {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform:rotate(10deg);
  }
}

@keyframes bound-in {
  10% {
    box-shadow: 0px 7px 30px 5px rgba(96, 93, 111,0.25);
    transform: translate(-50%, -50%) scale(0.8);
  }
  80% {
    transform: translate(-50%, -50%) scale(1.03);
  }
  100% {
    box-shadow: 0px 15px 35px 11px rgba(46, 44, 58,0.60);
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes bound-in-small {
  0% {
    /* box-shadow: 0px 5px 10px 5px rgba(96, 93, 111,0.19); */
    transform: translate(-50%, -50%) scale(0.8);
  }
  80% {
    transform: translate(-50%, -50%) scale(1.03);
  }
  100% {
    /* box-shadow: 0px 15px 35px 5px rgba(96, 93, 111,0.30); */
    transform: translate(-50%, -50%) scale(1);
  }
}


@keyframes arrow-left {
  0% {
    left: 45px;
    opacity: 0;
  }
  100% {
    left: 10px;
    opacity: 1;
  }
}

@keyframes arrow-right {
  0% {
    right: 75px;
    opacity: 0;
  }
  100% {
    right: 45px;
    opacity: 1;
  }
}
`

export class VolumeControl extends Component {
  constructor(props) {
    super(props)

    this.fill1Ref = React.createRef()
    this.fill2Ref = React.createRef()
  }

  componentDidMount(prevProps) {
    console.log('prevProps: ', prevProps)
    console.log('this.props.volume: ', this.props.volume)

  }

  render() {
    return (
      <Thermostat>
        <div className="bar">
          <div className="inner-bar"></div>
          <div className='hold left'>
            <div className='fill fill1' ref={this.fill1Ref}></div>
          </div>
          <div className='hold right'>
            <div className='fill fill2' ref={this.fill2Ref}></div>
          </div>
          <span>Volume</span>
        </div>
       
        <div className="shadow">
          <div className="shadow-cube"></div>
        </div>
        
        <div className="center">
          <span className="arrow minus" onClick={() => {
            let tempVol = this.props.volume + -1 // (what the vol will be when change made) aka -10db or 1% depends on VOLUME_INCREMENT
            console.log('new tempVol: ', tempVol)
            // this.fill1Ref.current.style.animation = 'none' // $(".fill").css("animation", "none");
            // this.fill2Ref.current.style.animation = 'none' // $(".fill").css("animation", "none");

            // if(tempVol > 0) {
            //   if(tempVol >= 50) {
            //     console.log('A', (50 - tempVol).toFixed(0))
            //     this.fill1Ref.current.style.transform = `rotate(${(3.16 * tempVol).toFixed(0)}deg)`
            //     this.fill1Ref.current.style.transitionDelay = '0s'
            //   } else {
            //     // range = 22-180deg || 158deg = 50%
            //     // 1.58 = 0.5deg || 3.16 = 1deg 
            //     console.log('B', (3.16 * tempVol).toFixed(0))
            //     this.fill2Ref.current.style.transform = `rotate(${(3.16 * tempVol).toFixed(0)}deg)`
            //     this.fill2Ref.current.style.transitionDelay = '0s'
            //   }
            // }

            this.props.volumeDown()
            }}>-</span>

          <span className="arrow plus" onClick={() => {
            let tempVol = this.props.volume - -1 // (what the vol will be when change made) aka -10db or 1% depends on VOLUME_INCREMENT
            console.log('new tempVol: ', tempVol)
            // this.fill1Ref.current.style.animation = 'none' // $(".fill").css("animation", "none");
            // this.fill2Ref.current.style.animation = 'none' // $(".fill").css("animation", "none");

            // if(tempVol < 100) {
            //   if(tempVol >= 50) {
            //     console.log('C', (50 - tempVol).toFixed(0))
            //     this.fill2Ref.current.style.transform = `rotate(${(3.16 * tempVol).toFixed(0)}deg)`
            //     this.fill2Ref.current.style.transitionDelay = '0s'
            //   } else {
            //     // range = 22-180deg || 158deg = 50%
            //     // 1.58 = 0.5deg || 3.16 = 1deg 
            //     console.log('D', (3.16 * tempVol).toFixed(0))
            //     this.fill2Ref.current.style.transform = `rotate(${(3.16 * tempVol).toFixed(0)}deg)`
            //     this.fill2Ref.current.style.transitionDelay = '0s'
            //   }
            // }
            this.props.volumeUp()
            }}>+</span>
            
          <div className="small">
            <span className={`volume ${this.props.isMuted ? 'muted' : ''}`}>{this.props.volume}</span>
          </div>
          <span className={`mute ${this.props.isMuted ? 'muted' : ''}`} onClick={() => this.props.toggleMute()}>{this.props.isMuted ? 'Unmute' : 'Mute'}</span>
        </div>
      </Thermostat>
    )
  }
}

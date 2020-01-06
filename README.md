# Aim of this project
The aim is to provide an intuitive interface for control of a home theatre receiver. The provided physical remote and web interface is not intuitive or very user friendly. The aim is to make the selection of various inputs and controls automated so that the use of the product is easier for the users.

## API endpoints needed

- Receiver on
- Input select
  - Phono
  - Tuner
  - Airplay
  - Audio1 (Optical)
  - Audio2 (Analog)
  - AV1(HDMI 1) [Bluetooth input]
- Receiver off (Standby)
- Sub ON/OFF
- Get state from the Reciver, in case of manual changes.
- Volume Up
- Volume Down
- Volume Mute


## Build plan
1. [x] Run stand alone tests using the npm package for the above input selections and criteria.
2. [] Build an Express API for the above endpoints
3. [] Build a front-end that uses the API.

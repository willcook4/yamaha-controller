## Aim of this project
The aim is to provide an intuitive interface for control of a home theatre receiver. The provided physical remote and web interface is not intuitive or very user friendly. The aim is to make the selection of various inputs and controls automated so that the use of the product is easier for the users.

## API endpoints needed

- [x]Receiver on
- [x]Input select
  - Phono
  - Tuner
  - Airplay
  - Audio1 (Optical)
  - Audio2 (Analog)
  - AV1(HDMI 1) [Bluetooth input]
- [x]Receiver off (Standby)
- Sub ON/OFF
- [x]Get state from the Reciver, in case of manual changes. (refresh UI)
- [x]Volume Up
- [x]Volume Down
- [x]Volume Mute
- [x]Power Status

## Build plan
1. [x] Run stand alone tests using the npm package for the above input selections and criteria.
2. [x] Build an Express API for the above endpoints
3. [] Build a front-end that uses the API.

## Dependencies
- [Yamaha Node](https://github.com/PSeitz/yamaha-nodejs), [(npm)](https://www.npmjs.com/package/yamaha-nodejs)

## How to setup and run
- Move into the backend folder
``` bash
cd backend
```
- Install backend packages
``` bash
yarn install
```
- Start the backend
``` bash
yarn start
```
- Optionally run with nodemon (mus tbe globally installed)
``` bash
yarn dev
```


## Endpoints
See ./ENDPOINTS.md

## Development notes
- The manual testing file in [Insomnia](https://insomnia.rest/) format file is in /backend/Audio_API_Insomnia.json
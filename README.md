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
- [bluebird, promise library](https://www.npmjs.com/package/bluebird)
- [body-parser, node json body parser](https://www.npmjs.com/package/body-parser)
- [chalk, colorful logging](https://www.npmjs.com/package/chalk)
- [express, web framework for node](https://www.npmjs.com/package/express)
- [helmet, security package](https://www.npmjs.com/package/helmet)
- [ping, node wrapper for ping command](https://www.npmjs.com/package/ping)
- [systeminformation, host information provider](https://www.npmjs.com/package/systeminformation)
- [tcp-port-used, host checker provider](https://www.npmjs.com/package/tcp-port-used)
- [validate.js, validation library](https://www.npmjs.com/package/validate.js)

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
- Optionally develop/run with nodemon (must be globally installed)
``` bash
yarn dev
```


## Endpoints
See ./backend/ENDPOINTS.md

## Development notes
- The manual testing file in [Insomnia](https://insomnia.rest/) format file is in /backend/Audio_API_Insomnia.json
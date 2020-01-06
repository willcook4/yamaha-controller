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

## Build plan
1. Run stand alone tests using the npm package for the above input selections and criteria.
2. Build an Express API for the above endpoints
3. Build a front-end that uses the API.

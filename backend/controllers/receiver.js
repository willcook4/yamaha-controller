const YamahaAPI = require('yamaha-nodejs')
const express = require('express')
const ping = require('ping')
const chalk = require('chalk')

let router = express.Router()
let { validate, ApiValidationError } = require('../lib/Validator')
let AppError = require('../lib/AppError')

/** 
 * Constants 
 */ 
// Action names
const ON = 'power-on'
const OFF = 'power-off'

// TODO move to .env
// Receiver settings
const RECEIVER_IP_ADDRESS = "10.0.1.3"
const RECEIVER_INPUTS = ['PHONO', 'TUNER', 'AirPlay', 'AUDIO1', 'AUDIO2', 'AV1']
const RECEIVER_VOLUME_CONTROLS = ['UP', 'DOWN']
const RECEIVER_VOLUME_UNITS = [10, 20, 30, 40, 50]
const RECEIVER_ZONES = ["Main_Zone", "Zone_2"]

/**
 * Detect if the network connection to the receiver is up (do we have connectivity?)
 * Perform a ping test to the receiver
 * @return {boolean}
 */
YamahaAPI.prototype.receiverAvailable = async function() {
  console.log('Checking if the receiver is available...')
  let resp = await ping.promise.probe(RECEIVER_IP_ADDRESS, { timeout: 2 })
  console.log(`Receiver is ${resp.alive ? chalk.green('available') : chalk.red('unavailable')}`)
  if(!resp.alive) return false
  return true
}

/**
 * #########################
 *     Helper Functions
 * #########################
 */

/** 
 * Get receiver volume of the provided zone
 * @param {string} zone one of the RECEIVER_ZONES
 */ 
async function getCurrentVolume (zone) {
  let info = await yamaha.getBasicInfo(zone)
  return info.getVolume()
}

/**
 * Setup the Yamaha receiver with the yamaha-nodejs package
 */
const yamaha = new YamahaAPI(RECEIVER_IP_ADDRESS)


/**
 * GET /power
 * Mounted: 
 *    GET /audio/receiver/power
 * ACTION: Returns the power status
 */
router
  .route('/power')
  .get(async (req, res, next) => {
    console.log('Received power status request')
    await yamaha.receiverAvailable()
      .then(async (receiverAvailable) => {
        // perform check that the receiver is available for requests
        if(!receiverAvailable) {
          throw new AppError('receiver.unavailable')
        }
        console.log('Requesting receiver info...')
        let basicInfo = await yamaha.getBasicInfo()
        let isOn = basicInfo.isOn()
        let isOff = basicInfo.isOff()
        // NOTE: Unsure of the exact yamaha status reporting options so checking both isOn and isOff.
        // Throw error on any conflict (e.g. ON and OFF at the same time)
        if ((isOn && isOff) || (!isOn && !isOff)) {
          throw new AppError('receiver.power.status.error')
        }

        let powerStatus = (!(isOn && !isOff) && (isOff && !isOn)) ? OFF: ON
        console.log('Receiver power status: ', powerStatus)
        return res.status(202).json({
                message: 'OK',
                status: powerStatus
               })          
      })
      .catch(next)
  })


/**
 * POST /power
 *
 * Mounted:
 *    POST /audio/receiver/power
 * 
 * Required payload
 * {
 *  @param {String} action, either 'power-on' OR 'power-off'
 * }
 *
 * ACTION: Turn the receiver ON or OFF
 */
router
  .route('/power')
  .post(async(req, res, next) => {
    console.log('Received power request', req.body)
    let data = req.body

    let constraints = {
      action: {
        presence: {
          allowEmpty: false
        },
        inclusion: {
          within: [ ON, OFF ],
          message: "action must be either 'power-on' OR 'power-off'"
        }
        
      }
    }

    validate.async(data, constraints, { wrapErrors: ApiValidationError })
    .then(async () => {
      let receiverAvailable = await yamaha.receiverAvailable()

      // perform check that the receiver is available for requests
      if(!receiverAvailable) {
        throw new AppError('receiver.unavailable')
      }

      if(data.action === ON) {
        console.log('Received ON power request')
        yamaha.powerOn()
          .then(() => {
            console.log("Powered the receiver ON")
            return res.status(202).json({
              message: 'OK',
              action: req.body.action
            })
          })
      } else {
        console.log('Received OFF power request')
        yamaha.powerOff()
          .then(() => {
            console.log("Powered the receiver OFF")
            return res.status(202).json({
              message: 'OK',
              action: req.body.action
            })
          })
      }
    }).catch(next)
  })

/**
 * POST /input-select
 *
 * Mounted:
 *    POST /audio/receiver/input-select
 * 
 * Required payload
 * {
 *  @param {String} input, one of the RECEIVER_INPUTS
 * }
 *
 * ACTION: Change the input on the receiver to
 */
router
  .route('/input-select')
  .post(async(req, res, next) => {
    console.log('Received input-selet request', req.body)
    let data = req.body

    let constraints = {
      input: {
        presence: {
          allowEmpty: false
        },
        inclusion: {
          within: RECEIVER_INPUTS,
          message: `value must be one of the following: ${RECEIVER_INPUTS}` 
        }
      }
    }

    validate.async(data, constraints, { wrapErrors: ApiValidationError })
    .then(async () => {
      let receiverAvailable = await yamaha.receiverAvailable()

      // perform check that the receiver is available for requests
      if(!receiverAvailable) {
        throw new AppError('receiver.unavailable')
      }

      yamaha.setMainInputTo(data.input)
        .then( function() {
          console.log(`Changed the receiver input to ${data.input}`)
          return res.status(202).json({
            message: 'OK',
            inputSelected: data.input
          })
        })
        .catch(e => {
          console.log(e)
          throw new AppError('receiver.error')
        })
    }).catch(next)
  })

  /**
 * POST /volume
 *
 * Mounted:
 *    POST /audio/receiver/volume
 * 
 * Payload
 * {
 *  @param {String} direction, one of the RECEIVER_VOLUME_CONTROLS
 *  @param {String} amount, one of the RECEIVER_VOLUME_UNITS, must be divisible by 5
 *  @param {String} zone, optional
 * }
 *
 * ACTION: Change the volume on the receiver
 */
router
.route('/volume')
.post(async(req, res, next) => {
  console.log('Received volume change request', req.body)
  let data = req.body

  let constraints = {
    direction: {
      presence: {
        allowEmpty: false
      },
      inclusion: {
        within: RECEIVER_VOLUME_CONTROLS,
        message: `value must be one of the following: ${RECEIVER_VOLUME_CONTROLS}` 
      }
    }, 
    amount: {
      presence: {
        allowEmpty: false
      },
      inclusion: {
        within: RECEIVER_VOLUME_UNITS,
        message: `value must be one of the following: ${RECEIVER_VOLUME_UNITS}`
      }
    },
    zone: {
      // optional, if not provided "Main_Zone" will be used
      // for string options see: RECEIVER_ZONES
    }
  }

  validate.async(data, constraints, { wrapErrors: ApiValidationError })
  .then(async () => {
    let receiverAvailable = await yamaha.receiverAvailable()

    // perform check that the receiver is available for requests
    if(!receiverAvailable) {
      throw new AppError('receiver.unavailable')
    }

    async function sendResponse (data) {
      let newVol = await getCurrentVolume(data.zone)
      console.log(`Changed the receiver volume for ${data.zone} ${data.direction} by ${data.amount}`)
      return res.status(202).json({
        message: 'OK',
        action: "volume-change",
        text: `Changed the receiver volume for ${data.zone} ${data.direction} by ${data.amount}`,
        newVolume: newVol
      })
    }
    
    data.zone = data.zone || "Main_Zone" // default to main zone, see RECEIVER_ZONES
    if(data.direction === 'UP') { // Note any change to RECEIVER_VOLUME_CONTROLS must be updated here
      await yamaha.volumeUp(data.amount, data.zone)
        .then((resp) => {
          return sendResponse(data)
        })
        .catch(e => {
          console.log(e)
          throw new AppError('receiver.error')
        })
    } else {
      await yamaha.volumeDown(data.amount, data.zone)
        .then((resp) => {
          return sendResponse(data)
        })
        .catch(e => {
          console.log(e)
          throw new AppError('receiver.error')
        })
    }
  }).catch(next)
})

module.exports = router
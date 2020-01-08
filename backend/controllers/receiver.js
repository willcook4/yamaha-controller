const YamahaAPI = require('yamaha-nodejs')
let express = require('express')
let ping = require('ping');
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

/**
 * Detect if the network connection to the receiver is up (do we have connectivity?)
 * Perform a ping test to the receiver
 * @return {boolean}
 */
YamahaAPI.prototype.receiverAvailable = async function() {
  console.log('Checking if the receiver is available...')
  let resp = await ping.promise.probe(RECEIVER_IP_ADDRESS, { timeout: 2 })
  console.log(`Receiver is ${resp.alive ? 'available' : 'unavailable'}`)
  if(!resp.alive) {
    return false
  }
  return true
}

/**
 * Setup the Yamaha receiver with the yamaha-nodejs package
 */
const yamaha = new YamahaAPI(RECEIVER_IP_ADDRESS)


/**
 * GET /power
 * 
 * ACTION: Returns the power status
 */


/**
 * POST /power
 *
 * Mounted :
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
            console.log("powered the receiver ON")
            return res.status(202).json({
              message: 'OK',
              action: req.body.action
            })
          }).catch(err => console.log('HERE A: ', err))
      } else {
        console.log('Received OFF power request')
        yamaha.powerOff()
          .then(() => {
            console.log("powered the receiver OFF")
            return res.status(202).json({
              message: 'OK',
              action: req.body.action
            })
          }).catch(err => console.log('HERE B: ', err))
      }
    }).catch(next)
  })

module.exports = router
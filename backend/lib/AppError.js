class BaseError extends Error {
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }
}

class AppError extends BaseError {
  constructor (type) {
    super()
    let msg = null
    this.code = 'app.logic.error'
    this.type = type

    switch (type) {
      case 'receiver.unavailable':
        msg = 'Unable to connect to the receiver'
        break
      case 'receiver.power.status.error':
        msg = 'Unable to get the power status'
        break
      case 'receiver.error':
        msg = 'Receiver error'
      default:
        this.type = `Invalid AppError type of [${type}] specified`
        msg = 'Specify a valid AppError.type'
        break
    }

    this.message = msg

    delete this.name
  }
}

module.exports = AppError

/**
 * Validation lib
 *
 *   https://validatejs.org/#validate-async
 */
let validate = require('validate.js')
let Promise = require('bluebird')
validate.Promise = Promise

/**
 * Wrapper to standardise API error response
 */
function ApiValidationError (errors, options, attributes, constraints) {
  Error.captureStackTrace(this, this.constructor)
  this.code = 'api.error.validation'
  this.errors = errors

  // TODO - remove these attributes in production
  this.options = options
  // this.attributes = attributes
  // this.constraints = constraints
}
ApiValidationError.prototype = new Error()


// Exports
module.exports.validate = validate
module.exports.ApiValidationError = ApiValidationError
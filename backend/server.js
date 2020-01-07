const pkg = require('./package.json')
const express = require('express')
const bodyParser = require('body-parser')
const tcpPortUsed = require('tcp-port-used')
const helmet = require('helmet');
// .env ????
const API_PORT = 9000

// create the app
const app = module.exports = express() // now app.js can be required to bring app into any file

/**
 * Middleware
 */
// Help secure Express apps with conscious HTTP headers
// https://github.com/helmetjs/helmet
app.use(helmet())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: '25mb' }))
// parse application/json
app.use(bodyParser.json({limit: '25mb'}))

app.use('/', require('./config/routes'))

/**
 * Validation Error Middleware
 *
 * These errors need to be consistant so the interfaces can present the info
 * back to the end use.
 */
app.use(function (err, req, res, next) {
  if (err.code === 'api.error.validation') {
    return res.status(400).json(err)
  }
  next(err)
})

/**
 * App Business Logic Error Middleware
 */
app.use(function (err, req, res, next) {
  if (err.code === 'app.logic.error') {
    return res.status(400).json(err)
  }
  next(err)
})

/**
 * Unhandled errors
 */
app.use(function (err, req, res, next) {
  console.log('Unhandled error', err)
  return res.status(500).json(err)
})

/**
 * Serve
 */
tcpPortUsed.check(API_PORT, '127.0.0.1')
  .then(() => {
    const server = app.listen(API_PORT, function () {
      console.log(`✔ [nodejs] ${process.version}`)
      console.log('')
      console.log(`✔ API server listening on port ${API_PORT} in ${app.get('env')} mode`)
      console.log(`✔ API version ${pkg.version}`, )
    })

    // increase the timeout to 2 minutes
    server.timeout = 120000
  })

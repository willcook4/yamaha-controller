let pkg = require('../package.json')
let app = require('../server')
let express = require('express')
let router = express.Router()

app.get('/', (req, res, next) => {
  res.status(200).json({
    name: pkg.name,
    version: pkg.version,
    env: process.env.NODE_ENV,
    up: process.uptime(),
    message: 'OK'
  })
})

module.exports = router
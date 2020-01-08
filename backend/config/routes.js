let app = require('../server')
let express = require('express')
let router = express.Router()

app.use('/', require('../controllers/diagnostics'))

app.use('/audio/receiver', require('../controllers/receiver'))

module.exports = router
let express = require('express')
const si = require('systeminformation')
const process = require('process')
let router = express.Router()
let pkg = require('../package.json')


// TODO WIP
async function serverInfo() {
  try {
      let data = {}
      console.log('Information: ')
      let info = await si.currentLoad()
      let memInfo = await si.mem()
      console.log(memInfo) 
      // let usedPercent = memInfo.used
      console.log('mem used(bytes): ', memInfo.used)
      console.log('memtotal(bytes): ', memInfo.total)
      console.log('men free(bytes):', memInfo.free)
      console.log('mem active(bytes): ', memInfo.active)
      console.log('mem total - free(bytes): ', memInfo.total - memInfo.free)
      // as a percent
      console.log('Used as Percent: ', (memInfo.total - memInfo.free) / memInfo.total)
      // console.log('mem used: ', (memInfo.used / memInfo.total) / 1073741824)
      data.processId = process.pid
      data.cpuLoad = info.currentload.toFixed(2) + '%'
      console.log('...')
      console.log(data)
      console.log('...')
  } catch (e) {
      console.log(e)
  }
}

router
  .route('/diagnostics')
  .get(async(req, res, next) => {
    let info = await serverInfo()

    console.log('info: ', info)
    return res.status(202).json({
      message: 'OK',
      nodeEnv: process.env.NODE_ENV,
      uptime: process.uptime(),
      name: pkg.name,
      version: pkg.version,
      info
    })
  })

module.exports = router
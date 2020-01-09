let express = require('express')
const si = require('systeminformation')
const process = require('process')
let router = express.Router()
let pkg = require('../package.json')

// TODO WIP
async function serverInfo() {
  try {
      let data = {}
      let info = await si.currentLoad()
      let memInfo = await si.mem()
      
      // on linux, all memInfo values are in kB,
      // console.log(memInfo) 

      data.untested = { // TODO WIP
        memInfo: {
          free: memInfo.free,
          total: memInfo.total,
          usedNum:  memInfo.used,
          usedPercent: (memInfo.total - memInfo.free) / memInfo.total,
          active: memInfo.active
        }
      }

      // Tested
      data.processId = process.pid
      data.cpuLoad = info.currentload.toFixed(2) + '%' 
      // console.log('...')
      // console.log(data)
      // console.log('...')
      return data
  } catch (e) {
      console.log(e)
  }
}

router
  .route('/diagnostics')
  .get(async(req, res, next) => {
    let info = await serverInfo()

    return res.status(202).json({
      message: 'OK',
      hostOS: process.platform,
      nodeEnv: process.env.NODE_ENV,
      uptime: process.uptime(),
      name: pkg.name,
      version: pkg.version,
      ...info
    })
  })

module.exports = router
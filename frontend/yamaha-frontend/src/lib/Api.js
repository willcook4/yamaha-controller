import axios from 'axios'

const PLATFORM_API_HOST = 'http://localhost:9000'

class Api {
  /**
   * Get the status info for a zone of receiver
   * @param {String} zone // e.g. 'Main_Zone'
   */
  getCurrentInfo(zone) {
    let endpoint = this._makeEndpoint(`/audio/receiver/zone/${zone}`)
    return this._get(endpoint)
  }

  /**
   * Toggle the power for a zone on or off
   * @param {*} zone 
   * @param {*} action 'power-on' || 'power-off'
   */
  togglePowerForZone(zone, action) {
    let endpoint = this._makeEndpoint('/audio/receiver/power')
    return this._post(endpoint, { zone, action })
  }

  /**
   * Mute a zone
   * @param {String} zone // Zone to action
   * @param {String} action 'MUTE' || 'UNMUTE'
   */
  toggleMuteZone(zone, action) {
    let endpoint = this._makeEndpoint('/audio/receiver/volume/mute')
    return this._post(endpoint, { zone, action })
  }

  /**
   * Set the volume of a zone
   * @param {String} direction // 'UP' or 'DOWN'
   * @param {Int} number // How much up or down in db (0db == Max Volume, -800 is Min Volume)
   * @param {String} zone // Zone you are changing
   */
  changeVolume(direction, amount, zone) {
    let endpoint = this._makeEndpoint('/audio/receiver/volume')
    let data = {
      direction,
      amount,
      zone
    }
    return this._post(endpoint, data)
  }

  /**
   * Select an input source for a zone
   * @param {String} input // one of the RECEIVER_INPUTS on the API
   * @param {*} zone // one of the RECEIVER_ZONES on the API
   */
  setZoneSource(input, zone) {
    let endpoint = this._makeEndpoint(`/audio/receiver/input-select`)
    return this._post(endpoint, { input, zone })
  }

  _post (endpoint, data) {
    return axios.post(endpoint, data)
  }

  /**
   * Default method of doing a get request
   * @param {String} endpoint 
   * @param {Object} payload 
   */
  _get (endpoint, payload = {}) {
    let options = {
      method: 'get',
      params: payload,
      responseType: 'json'
    }
    return axios.get(endpoint, options)
  }

  /**
   * Function to return a string of the fully qualified API endpoint
   * @param {String} endpoint 
   */
  _makeEndpoint(endpoint) {
    // TODO move PLATFORM_API_HOST to a .env
    return `${PLATFORM_API_HOST}${endpoint}`
  }
}

export default new Api()
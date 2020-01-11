import axios from 'axios'

const PLATFORM_API_HOST = 'http://localhost:9000'

class Api {
  /**
   * Get the status info for a zone of receiver
   * @param {String} zone // e.g. 'Main_Zone'
   */
  getCurrentInfo(zone) {
    let endpoint = this._makeEndpoint(`/audio/receiver/zone/${zone}`)
    console.log('ZZZZ: ', endpoint)
    return this._get(endpoint)
  }

  /**
   * Set the volume
   * @param {*} endpoint 
   * @param {*} payload 
   */

  /**
   * Default method of doing a get request
   * @param {String} endpoint 
   * @param {Object} payload 
   */
  _get (endpoint, payload = {}) {
    let options = {
      method: 'get',
      url: endpoint,
      params: payload,
      responseType: 'json'
    }
    
    return axios.get(options)
  }

  _post (endpoint, payload={}) {
    let options = {

    }
    return axios.post(options)
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
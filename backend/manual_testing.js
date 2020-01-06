var YamahaAPI = require("yamaha-nodejs");
var yamaha = new YamahaAPI("10.0.1.3");

console.log('starting script');

/** 
 * Receiver on
 */
// yamaha.powerOn().then(function() {
//   	console.log("powered amp ON");
// })

/**
 * Set receiver to Phono
 */
// yamaha.setMainInputTo("PHONO").then( function() {})

/**
 * Set receiver to Tuner
 */
// yamaha.setMainInputTo("TUNER").then( function() {})

/**
 * Set receiver to Airplay
 */
// yamaha.setMainInputTo("AirPlay").then( function() {})

/**
 * Set receiver to Audio1
 */
// yamaha.setMainInputTo("AUDIO1").then( function() {})

/**
 * Set receiver to Audio2
 */
// yamaha.setMainInputTo("AUDIO2").then( function() {})


/**
 * Set receiver to AV1(HDMI 1) [Bluetooth input]
 */
// yamaha.setMainInputTo("AV1").then( function() {})

/**
 * Receiver off (Standby)
 */
// yamaha.powerOff();

/**
 * Subwoofer ON / OFF
 * TODO
 * change the value provided, not sure of range
 * Note: this needs physical testing, not showing as changed on the receiver display
 */
// yamaha.setSubwooferTrimTo(0).then( function() {})

/** 
 * Volume UP 
 * Notes:
 *  The zone must be provided.
 *  The value(number) can be changed to make small or large jumps in vol.
 * 
*/
// yamaha.volumeUp(50, "Main_Zone").then( function(resp) {
//   console.log(resp)
// })

/**
 * Volume Down
 *  The zone must be provided.
 *  The value(number) can be changed to make small or large jumps in vol.
 */
// yamaha.volumeDown(50, "Main_Zone").then( function(resp) {})  

/**
* Mute ON
*/
//  yamaha.muteOn("Main_Zone").then( function() {})

/**
 * Mute OFF
 * Note: Also pressing volume up will do the same
 */
// yamaha.muteOff("Main_Zone").then( function() {})

/**
 * Get state from the Reciver, in case of manual changes.
 */
// yamaha.getBasicInfo("Main_Zone").done(function(basicInfo){
//   console.log(basicInfo.getVolume());
//   console.log(basicInfo.isMuted());
//   console.log(basicInfo.isOn());
//   console.log(basicInfo.isOff());
//   console.log(basicInfo.getCurrentInput());
//   console.log(basicInfo.isPartyModeEnabled());
//   console.log(basicInfo.isPureDirectEnabled());
//   console.log(basicInfo.getBass());
//   console.log(basicInfo.getTreble());
//   console.log(basicInfo.getSubwooferTrim());
//   console.log(basicInfo.getDialogueLift());
//   console.log(basicInfo.getDialogueLevel());
//   console.log(basicInfo.getZone());
//   console.log(basicInfo.isYPAOVolumeEnabled());
//   console.log(basicInfo.isExtraBassEnabled());
//   console.log(basicInfo.isAdaptiveDRCEnabled());
// })

/**
 * Get the current input
 */
// yamaha.getCurrentInput().then(function(resp) {
//   console.log(resp)
// })
// resp // 'AUDIO1'

/**
 * Get available inputs 
 */

// yamaha.getAvailableInputs().then(function(resp) {
//   console.log(resp)
// })

// The logged resp... note the lack of 'Airplay'!
// [ 'MULTI CH', 'PHONO', 'AV1', 'AV2', 'AV3', 'AV4', 'AV5', 'AV6',
//   'AV7', 'V-AUX', 'AUDIO1', 'AUDIO2', 'AUDIO3', 'AUDIO4', 'USB' ]
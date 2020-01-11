## Endpoints
All endpoints return Google Style camelCase key names with values as strings, numbers or booleans.

### Diagnostics
* GET ```/diagnostics``` returns information about the API

e.g. response
```
{
name: "yamaha-backend",
version: "0.0.1",
up: 18.998,
message: "OK"
}
```

### Turn the Receiver ON/OFF
* POST ```/audio/receiver/power``` takes an action string

Payload:
```
{ 
  "action": "power-on" OR "power-off"
}
```

e.g. response:
```
{
  "message": "OK",
  "action": "power-on"
}
```


### Query the power status of the receiver
* GET ```/audio/receiver/power```

e.g. response
```
{
  "message": "OK",
  "status": "power-on" || "power-off"
}
```

### Select the input on the receiver 
* POST ```/audio/receiver/input-select``` takes an input string

Payload:
```
{
	"input": "AUDIO1"
}
```

e.g. response
```
{
  "message": "OK",
  "inputSelected": "AUDIO1"
}
```

### Change a zones volume on the receiver
* POST ```/audio/receiver/volume``` takes a direction, amount and zone(optional, defaults to: 'Main_Zone)

Payload: 
```
{
	"direction": "UP",
	"amount": 10,
	"zone": "Main_Zone"
}
```

e.g response
```
{
  "message": "OK",
  "action": "volume-change",
  "text": "Changed the receiver volume for Main_Zone UP by 10",
  "newVolume": -690
}
```

### Get the current info of a zone on the receiver
* GET ```/audio/receiver/zone/:zone``` takes a zone(required)

e.g. response
```
{
  "message": "OK",
  "zone": "Main_Zone",
  "zoneON": true,
  "zoneMuted": false,
  "zoneVol": -525,
  "zoneCurrentInput": "AUDIO1"
}
```

### Toggle Mute on a zone of the receiver
* POST ```/audio/receiver/volume/mute``` take a zone(optional, defaults to: 'Main_Zone) and action

Payload:
```
{
	"action": "UNMUTE",
	"zone": "Main_Zone"
}
```

example response:
```
{
  "message": "OK",
  "action": "volume-unmute",
  "text": "Changed the receiver volume for Main_Zone to UNMUTED",
  "newVolume": -545,
  "muted": false
}
```


## Errors
* ANY ```/audio/receiver``` Unable to connect to the receiver

e.g. response
```
{
  "code": "app.logic.error",
  "type": "receiver.unavailable",
  "message": "Unable to connect to the receiver"
}
```
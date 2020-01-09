## Endpoints

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
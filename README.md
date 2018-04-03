# Simple Amazon Alexa compatible device emulator

This is a simple proof of concept software to enable local interaction between an Amazon Alexa device (such as Echo, Echo Dot, etc.), and a web server.
The number of commands Alexa can run on this server is determined by the emulated device type.

For instance, the default device emulated is a Belkin Switch which has 2 states: on and off.

This allow us to call the API from within Alexa and turn on/off our emulated switch.

It is important to point out that no Alexa skill is necessary.

## Setup

- Clone the repository ([github.com/fechy/alexa-upnp-device-emulator.git](https://github.com/fechy/alexa-upnp-device-emulator.git))
- Run `npm install`

## Scripts

There is 2 essential scripts running: `server.js` and `web.js`, and a third non-essential script `client.js`.

- **Server.js**:
This is the uPnP server listening and answering to the `ssdp:discovery` events sent by other devices looking for devices. 
After Alexa has successfully detected the device, you can safelly close this script. I'll recommend closing it after Alexa discover the device. Other devices in your network might keep hitting your server looking for new devices unnecessarily.

- **Web.js**:
The API providing the endpoints necessary for answering Alexa's requests.

- **Client.js**:
Simple script to search for compatible uPnP devices on the network and printing them on the console. This is useful to know whats in our network and how we can interact with it.

## Usage

Simply run on 2 different console windows, one with the server:

```bash
npm run server
```

If you want to know what's the script doing, run like this:

```bash
npm run server-debug
```

... and other window with the web API:

```bash
npm run api
```

Once you have both scripts running, run "discover devices" on Alexa, either by the Alexa app or telling alexa to "discover devices".

Once the device is dicovered (The name can be changed on `specs/const.js`; default is "emulated switch"). Now you should be able to turn on/off the device and the calls should be outputted in the API's console.

## Throubleshooting

Since this script relies on having port **1900** open, you should allow `node` to send and receive from this port. If the system is not asking you whether you'll like to give permission, you should manually allow it on your firewall.

## Limitations

Currently it only works emulating a Belkin switch and the actions are limited to toggle on and off.
const { name, uuid, descriptionFile } = require('./specs/const');
const Server = require('node-ssdp').Server;

const ipAddress = require('ip').address();
const serverPort = process.env.PORT || 8080;

const server = new Server({
    udn: `uuid:${uuid}`,
    location: `http://${ipAddress}:${serverPort}/${descriptionFile}`,
    ssdpPort: 1900,
    sourcePort: 1900
});

// server.addUSN('upnp:rootdevice');
server.addUSN('urn:Belkin:device:**');
// server.addUSN('ssdp:all');
server.addUSN('ssdp:discovery');

// server.on('notify', (...props) => console.log('Notify', props));
// server.on('m-search', (...props) => console.log('m-search', props));
// server.on('advertise-alive', (...props) => console.log('advertise-alive', props));
// server.on('advertise-bye', (...props) => console.log('advertise-bye', props));

// start the server
server.start();

process.on('exit', function() {
    server.stop() // advertise shutting down and stop listening
});
const path = require('path');
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const port = process.env.PORT || 8080; // If changed, it should also be changed in the server

// Project imports
const { name, uuid, descriptionFile, eventServiceFile } = require('./specs/const');
const Device = require('./src/device');
const Handler = require('./src/handler');

// Create a new Handler and a new Device
const device = new Device(name, uuid);
const requestHandler = new Handler(device);

const descriptionXML = require('./specs/description');
const eventServiceXML = require('./specs/eventService');
const { getBinaryStateResponse, setBinaryStateResponse } = require('./src/deviceResponses');

/**
 * Simple Soap Action parser
 * @param {String} soapaction 
 */
const getSoapAction = function (soapaction) {
    const parts = soapaction.split("#");
    if (parts.length < 2) {
        return soapaction;
    }

    return parts[1].replace('"', '');
}

const server = app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }

    console.log(`server is listening on ${port}`);
});

const io = require('socket.io')(server);

// Set socket.io listeners.
io.on('connection', (socket) => {
    // console.log('user connected');
    socket.on('disconnect', () => {
        // console.log('user disconnected');
    });
});

app.use(express.static('static'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Web GUI
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

// Calls to this endpoint will be made after contacting the server via M-SEARCH 
app.get(`/${descriptionFile}`, (request, response) => {
    console.log(request.originalUrl, request.headers, request.body);

    io.emit('request-setup', { host: request.get('host'), headers: request.headers });

    response.status(200)
            .header("Content-Type", "text/xml")
            .send(descriptionXML(device.name, device.uuid));
});

// Currently without use
app.get(`/${eventServiceFile}`, (request, response) => {
    console.log(request.originalUrl, request.headers, request.body);

    io.emit('request-service', { host: request.get('host'), headers: request.headers });

    response.status(200)
            .header("Content-Type", "text/xml")
            .send(eventServiceXML());
});

// Alexa will call this enpoint with the soap action and we should return an envelope with the result
app.post('/upnp/control/basicevent1', (request, response) => {
    const action = getSoapAction(request.headers.soapaction);
    const value  = requestHandler.handle(action);

    const result = action == 'GetBinaryState' ? getBinaryStateResponse(value) : setBinaryStateResponse(value);

    console.log(request.originalUrl, request.headers, request.body);

    io.emit('request-action', { host: request.get('host'), headers: request.headers, action, result: value });

    response.status(200)
            .header("Content-Type", "text/xml")
            .send(result); 
});

// Just for debug, to check whats being asked...
// app.get('*', (request, response) => {
//     console.log(request.originalUrl, request.headers);
//     response.status(200).send('');
// });

// Just for debug, to check whats being asked...
app.post('*', (request, response) => {
    console.log(request.originalUrl, request.body);
    response.status(200).send('');
});
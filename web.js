const path = require('path');
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const port = process.env.PORT || 8080; // If changed, it should also be changed in the server

// Project imports
const { name, uuid, descriptionFile } = require('./specs/const');
const Device = require('./src/device');
const Handler = require('./src/handler');

// Create a new Handler and a new Device
const device = new Device(name, uuid);
const requestHandler = new Handler(device);

const descriptionXML = require('./specs/description');

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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Calls to this endpoint will be made after contacting the server via M-SEARCH 
app.get(`/${descriptionFile}`, (request, response) => {
    console.log(request.originalUrl, request.headers, request.body);
    response.header("Content-Type", "text/xml")
            .send(descriptionXML(device.name, device.uuid));
});

// Alexa will call this enpoint with the soap action and we should return an envelope with the result
app.post('/upnp/control/basicevent1', (request, response) => {
    console.log(request.originalUrl, request.headers, request.body);

    const action = getSoapAction(request.headers.soapaction);
    const value = requestHandler.handle(action);

    response.status(200).send(`
        <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
            <s:Body>
                <u:SetBinaryStateResponse xmlns:u="urn:Belkin:service:basicevent:1">
                <CountdownEndTime>${value}</CountdownEndTime>
                </u:SetBinaryStateResponse>
            </s:Body>
        </s:Envelope>
    `);
});

// Just for debug, to check whats being asked...
app.get('*', (request, response) => {
    console.log(request.originalUrl);
    response.status(200).send('');
});

// Just for debug, to check whats being asked...
app.post('*', (request, response) => {
    console.log(request.originalUrl, request.body);
    response.status(200).send('');
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
});
/**
 * Simple script to scan the network looking for uPnP devices
 */
const Client = require('node-ssdp').Client;
const client = new Client();

client.on('notify', function () {
    console.log('Got a notification.')
})

client.on('response', function inResponse(headers, code, rinfo) {
    console.log('Got a response to an m-search:\n%d\n%s\n%s', code, JSON.stringify(headers, null, '  '), JSON.stringify(rinfo, null, '  '))
});

client.search('ssdp:all');

// Or maybe if you want to scour for everything after 10 seconds
setInterval(function() {
    client.search('ssdp:all');
}, 10000);

process.on('exit', function(){
    client.stop();
});
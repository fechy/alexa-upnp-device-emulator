const { eventServiceFile } = require('./const');

const deviceType = 'urn:Belkin:device:controllee:1';
const modelNumber = '3.1415';
const modelName = 'Emulated Thing';

const descriptionXML = (name, uuid) => (
    `<?xml version="1.0"?>
<root xmlns="urn:Belkin:device-1-0">
<device>
	<deviceType>${deviceType}</deviceType>
	<friendlyName>${name}</friendlyName>
	<manufacturer>Belkin International Inc.</manufacturer>
	<modelName>${modelName}</modelName>
	<modelNumber>${modelNumber}</modelNumber>
	<UDN>uuid:Socket-1_0-${uuid}</UDN>
	<serviceList>
	  <service>
	    <serviceType>urn:Belkin:service:basicevent:1</serviceType>
	    <serviceId>urn:Belkin:serviceId:basicevent1</serviceId>
	    <controlURL>/upnp/control/basicevent1</controlURL>
	    <eventSubURL>/upnp/event/basicevent1</eventSubURL>
	    <SCPDURL>/${eventServiceFile}</SCPDURL>
	  </service>
	</serviceList>
</device>
</root>`
);

module.exports = descriptionXML;
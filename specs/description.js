const manufacturer = 'Fernando Giovanini';
const deviceType = 'urn:schemas-upnp-org:device:Basic:1';
const modelNumber = '3.1415';
const modelName = 'Emulated Thing';

const descriptionXML = (name, uuid) => (
    `<?xml version="1.0"?>
    <root>
        <specVersion>
            <major>1</major>
            <minor>0</minor>
        </specVersion>
        <device>
            <deviceType>${deviceType}</deviceType>
            <friendlyName>${name}</friendlyName>
            <manufacturer>${manufacturer}</manufacturer>
            <modelName>${modelName}</modelName>
            <modelNumber>${modelNumber}</modelNumber>
            <UDN>uuid:${uuid}</UDN>
        </device>
    </root>`
);

module.exports = descriptionXML;
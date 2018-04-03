const setBinaryStateResponse = (value) => (
    `<?xml version="1.0" encoding="utf-8"?>
    <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap­/envelope/" s:encodingStyle="http://schemas.xmlsoap.­org/soap/encoding/">
        <s:Body>
            <u:SetBinaryState xmlns:u="urn:Belkin:service:basicevent:1­">
                <BinaryState>${value}</BinaryState>
            </u:SetBinaryState>
        </s:Body>
    </s:Envelope>`
);

const getBinaryStateResponse = (value) => (
    `<?xml version="1.0" encoding="utf-8"?>
    <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap­/envelope/" s:encodingStyle="http://schemas.xmlsoap.­org/soap/encoding/">
        <s:Body>
            <u:GetBinaryState xmlns:u="urn:Belkin:service:basicevent:1­">
                <BinaryState>${value}</BinaryState>
            </u:GetBinaryState>
        </s:Body>
    </s:Envelope>`
);

module.exports = {
    getBinaryStateResponse,
    setBinaryStateResponse
};
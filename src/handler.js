class Handler
{
    constructor(device) {
        this.device = device;
    }

    handle (action) {
        switch(action) {
            case 'GetBinaryState':
                return this.device.getState();
            case 'SetBinaryState':
                return this.device.toggleState();
            default:
                console.log(`Invalid action: "${action}"`);
                return null;
        }
    }
}

module.exports = Handler;
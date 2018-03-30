class Device {

    constructor(name, uuid) {
        this.name = name;
        this.uuid = uuid;
        
        this.state = {
            value: 0
        };
    }

    setState (newState) {
        this.state.value = newState;
    }

    getState () {
        return this.state.value;
    }

    toggleState () {
        const state = this.getState();
        this.setState(state == 1 ? 0 : 1);
        return this.getState();
    }
}

module.exports = Device;
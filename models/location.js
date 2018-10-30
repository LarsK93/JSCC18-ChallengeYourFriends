module.exports = class Location {
    constructor(latitude, longitude, label) {
        this.latitude = latitude
        this.longitude = longitude
        this.label = label
    }

    static create({ latitude, longitude, label }) {
        return new Location(latitude, longitude, label)
    }
}
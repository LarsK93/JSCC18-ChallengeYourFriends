const Challenge = require('./challenge')

module.exports = class PrivateChallenge extends Challenge {
    constructor(partialChallenges, creator) {
        super(partialChallenges, creator)
        this.accessibleByUsers = [creator]
    }

    static create({ partialChallenges, creator }) {
        return new User(partialChallenges, creator)
    }

    permitAccess(users) {
        this.accessibleByUsers.push(users)
    }
}
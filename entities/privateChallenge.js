const Challenge = require('./challenge')

module.exports = class PrivateChallenge extends Challenge {
    constructor(partialChallenges, creator) {
        super(partialChallenges, creator)
        this.accessibleByUsers = [creator]
    }

    permitAccess(users) {
        this.accessibleByUsers.push(users)
    }
}
const Challenge = require('./challenge')
const User = require('./user')

module.exports = class PrivateChallenge extends Challenge {
    constructor(partialChallenges, creator) {
        super(partialChallenges, creator)
        this.accessibleByUsers = [creator]
    }

    static create({ partialChallenges, creator, accessibleByUsers }) {
        const privateChallenge = new PrivateChallenge(partialChallenges, creator)
        privateChallenge.accessibleByUsers = accessibleByUsers.map(User.create)
    }

    permitAccess(users) {
        this.accessibleByUsers.push(users)
    }
}
module.exports = class Challenge {
    constructor(partialChallenges, creator) {
        this.partialChallenges = this.partialChallenges
        this.creator = creator
        this.rating = null
    }

    static create({ partialChallenges, creator }) {
        return new User(partialChallenges, creator)
    }
}
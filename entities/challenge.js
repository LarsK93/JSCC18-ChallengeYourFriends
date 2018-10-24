module.exports = class Challenge {
    constructor(partialChallenges, creator) {
        this.partialChallenges = partialChallenges
        this.creator = creator
        this.rating = null
    }

    static create({ partialChallenges, creator }) {
        return new Challenge(partialChallenges, creator)
    }
}
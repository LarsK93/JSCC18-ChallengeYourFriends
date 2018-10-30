module.exports = class Challenge {
    constructor(partialChallenges, creator) {
        this.partialChallenges = partialChallenges
        this.creator = creator
        this.ratings = []
    }

    static create({ partialChallenges, creator, ratings }) {
        const challenge = new Challenge(partialChallenges, creator)
        challenge.rating = ratings
    }
}
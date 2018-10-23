module.exports = class ChallengePart {
    constructor(question, solution, hint1, hint2, hint3, location) {
        this.question = question
        this.solution = solution

        this.hint1 = hint1
        this.hint2 = hint2
        this.hint3 = hint3

        this.location = location
    }
}
const ChoiceElement = require('./choiceelement')

module.exports = class ChoiceQuestion {
    constructor(element1Value, element2Value) {
        this.element1 = new ChoiceElement(element1Value)
        this.element2 = new ChoiceElement(element2Value)
        this.usersSkipped = [] // users who skipped this choice
    }

    addUserSkipped(user) {
        this.usersSkipped.push(user)
    }

    toString() {
        return '\n\t' + this.element1.value + '     OR     ' + this.element2.value 
                + '\t\tPlease type \'1\' or \'2\' or \'skip\'!'
    }
}
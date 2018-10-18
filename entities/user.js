module.exports =  class User {
    constructor(age, nationality, residency) {
        this.age = age
        this.nationality = nationality
        this.residency = residency
        
        this.currentChoiceQuestion = null
        this.currentAnswer = null
    }

    choose(choiceElement) {
        choiceElement.addUserChose(this)
    }

    skip(choiceQuestion) {
        choiceQuestion.addUserSkipped(this)
    }

    processInput(input) {
        this.currentAnswer = input
        if(input === 'skip') {
            this.skip(this.currentChoiceQuestion)
        }
        else if (input === '1') {
            this.choose(this.currentChoiceQuestion.element1)
        }
        else if (input === '2') {
            this.choose(this.currentChoiceQuestion.element2)
        }
        else {
            console.log('Invalid Input!')
        }
    }
}
const readline = require('readline-sync')

const ChoiceQuestion = require('./choicequestion')

module.exports = class ChoiceController {
    constructor() {
        // some example choices
        this.choiceQuestions = [new ChoiceQuestion('Beer', 'Wine'), 
                        new ChoiceQuestion('Facebook', 'Twitter'),
                        new ChoiceQuestion('Game of Thrones', 'Breaking Bad'),
                        new ChoiceQuestion('Stay', 'Leave'),
                        new ChoiceQuestion('Yes', 'No'),
                        new ChoiceQuestion('Warm', 'Cold')]
    }

    push(choices) {
        this.choiceQuestions.push(choices)
    }

    getRandomChoice() {
        // TODO make dependent of user - give choice question only once to single user!
        return this.choiceQuestions[Math.floor(Math.random() * this.choiceQuestions.length)]
    }

    executeRound(user) {
        user.currentChoiceQuestion = this.getRandomChoice()
        console.log(user.currentChoiceQuestion.toString())
        var answer = readline.question()
        user.processInput(answer)
    }

    simulateRound(user) {
        user.currentChoiceQuestion = this.getRandomChoice()
        var randomAnswer = String(Math.floor(Math.random() * 2) + 1)
        user.processInput(randomAnswer)
    }

    evaluateRound(user) {
        this.evaluateByAge(user)
        // TODO evaluate by nationality and city
    }

    evaluateByAge(user) {
        var choseElementByAge = null
        var chosenElement = null
        if (user.currentAnswer == '1') {
            chosenElement = user.currentChoiceQuestion.element1
            choseElementByAge = chosenElement.users
                                        .filter(element => element.age == user.age)
                                        .filter(element => element != user)
        }
        else if (user.currentAnswer == '2') {
            chosenElement = user.currentChoiceQuestion.element2
            choseElementByAge = chosenElement.users
                                        .filter(element => element.age == user.age)
                                        .filter(element => element != user)
        }
        if (chosenElement != null) {
            var sumChoicesByAge = user.currentChoiceQuestion.element1.users
                                        .filter(element => element.age == user.age)
                                        .filter(element => element != user).length 
                                    + user.currentChoiceQuestion.element2.users
                                        .filter(element => element.age == user.age)
                                        .filter(element => element != user).length 
            var shareOfElement = choseElementByAge.length / sumChoicesByAge
            if (sumChoicesByAge > 0) {
                console.log('You chose', chosenElement.value + '!', shareOfElement * 100, 
                    '% of other people aged', user.age, 'decided for the same answer!',
                    '(' + sumChoicesByAge, 'participated)')
            }
            else {
                console.log('No other people aged', user.age, 'answered this choice yet!')
            }
        }
    }
}
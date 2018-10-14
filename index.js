const readline = require('readline-sync')

var User = class {
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

    skip(ChoiceQuestion) {
        ChoiceQuestion.addUserSkipped(this)
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

var ChoiceQuestion = class {
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

var ChoiceElement = class {
    constructor(value) {
        this.value = value
        this.users = [] // users who chose this element
    }

    addUserChose(user) {
        this.users.push(user)
    }
}

var ChoiceController = class {
    constructor() {
        // some example choices
        this.choices = [new ChoiceQuestion('Beer', 'Wine'), 
                        new ChoiceQuestion('Facebook', 'Twitter'),
                        new ChoiceQuestion('Game of Thrones', 'Breaking Bad'),
                        new ChoiceQuestion('Stay', 'Leave'),
                        new ChoiceQuestion('Yes', 'No'),
                        new ChoiceQuestion('Warm', 'Cold')]
    }

    push(choices) {
        this.choices.push(choices)
    }

    getRandomChoice() {
        // TODO make dependent of user - give choice question only once to single user!
        return this.choices[Math.floor(Math.random() * this.choices.length)]
    }

    executeRound(user) {
        user.currentChoice = this.getRandomChoice()
        console.log(user.currentChoice.toString())
        var answer = readline.question()
        user.processInput(answer)
    }

    simulateRound(user) {
        user.currentChoice = this.getRandomChoice()
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
            chosenElement = user.currentChoice.element1
            choseElementByAge = chosenElement.users
                                        .filter(element => element.age == user.age)
                                        .filter(element => element != user)
        }
        else if (user.currentAnswer == '2') {
            chosenElement = user.currentChoice.element2
            choseElementByAge = chosenElement.users
                                        .filter(element => element.age == user.age)
                                        .filter(element => element != user)
        }
        var sumChoicesByAge = user.currentChoice.element1.users
                                    .filter(element => element.age == user.age)
                                    .filter(element => element != user).length 
                                + user.currentChoice.element2.users
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

choiceController = new ChoiceController()

// instanciate base of users and answers as example
var user1 = new User(19, 'Finland', 'Berlin')
for (var i = 0; i < 5; i++) {
    choiceController.simulateRound(user1)
}
var user2 = new User(25, 'Germany', 'Berlin')
for (var i = 0; i < 5; i++) {
    choiceController.simulateRound(user2)
}
var user3 = new User(21, 'Germany', 'Tokyo')
for (var i = 0; i < 5; i++) {
    choiceController.simulateRound(user3)
}
var user4 = new User(34, 'Japan', 'London')
for (var i = 0; i < 5; i++) {
    choiceController.simulateRound(user4)
}
var user5 = new User(58, 'Brazil', 'San Francisco')
for (var i = 0; i < 5; i++) {
    choiceController.simulateRound(user5)
}
var user6 = new User(42, 'USA', 'Rome')
for (var i = 0; i < 5; i++) {
    choiceController.simulateRound(user6)
}
var user7 = new User(24, 'Russia', 'Berlin')
for (var i = 0; i < 5; i++) {
    choiceController.simulateRound(user7)
}
var user8 = new User(25, 'Italy', 'Berlin')
for (var i = 0; i < 5; i++) {
    choiceController.simulateRound(user8)
}
var user9 = new User(36, 'Spain', 'Berlin')
for (var i = 0; i < 5; i++) {
    choiceController.simulateRound(user9)
}
var user10 = new User(14, 'France', 'Berlin')
for (var i = 0; i < 5; i++) {
    choiceController.simulateRound(user10)
}

// read user data and answers from console
age = readline.questionInt('Your Age: ')
nationality = readline.question('Your Nationality (optional): ')
residency = readline.question('Your city of residency (optional): ')

var user = new User(age, nationality, residency)

while(true) {
    choiceController.executeRound(user)
    choiceController.evaluateRound(user)
}
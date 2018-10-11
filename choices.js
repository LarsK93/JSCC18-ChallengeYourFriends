const readline = require('readline-sync')

var User = class {
    constructor(age, nationality, countryOfResidence) {
        this.age = age
        this.nationality = nationality
        this.countryOfResidence = countryOfResidence
        
        this.currentChoice = null
    }

    choose(choiceElement) {
        choiceElement.addUserChose(this)
    }

    skip(choice) {
        choice.addUserSkipped(this)
    }

    processInput(input) {
        if(input === 'skip') {
            this.skip(this.currentChoice)
        }
        else if (input === '1') {
            this.choose(this.currentChoice.element1)
        }
        else if (input === '2') {
            this.choose(this.currentChoice.element2)
        }
        else {
            console.log('Invalid Input!')
        }
    }
}

var Choice = class {
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
        this.choices = [new Choice('Beer', 'Wine'), 
                        new Choice('Facebook', 'Twitter'),
                        new Choice('Game of Thrones', 'Breaking Bad'),
                        new Choice('Stay', 'Leave'),
                        new Choice('Yes', 'No'),
                        new Choice('Warm', 'Cold')]
    }

    push(choices) {
        this.choices.push(choices)
    }

    getRandomChoice() {
        return this.choices[Math.floor(Math.random() * this.choices.length)]
    }
}

age = readline.questionInt('Age: ')
nationality = readline.question('Nationality: ')
countryOfResidence = readline.question('CountryOfResidence: ')

var user = new User(age, nationality, countryOfResidence)

console.log(user)

choiceController = new ChoiceController()

while(true) {
    user.currentChoice = choiceController.getRandomChoice()
    console.log(user.currentChoice.toString())
    answer = readline.question()
    user.processInput(answer)
}
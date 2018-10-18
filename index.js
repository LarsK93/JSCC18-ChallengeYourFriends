const readline = require('readline-sync')

const User = require('./entities/user')
const ChoiceController = require('./entities/choicecontroller')

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
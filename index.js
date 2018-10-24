const readline = require('readline-sync')
const bcrypt = require('bcrypt')

const User = require('./entities/user')
const Location = require('./entities/location')
const Database = require('./storage/database')

let running = true
const usersSavedFilePath = 'storage/savedFiles/users'
const bcryptSaltRounds = 10

let users = Database.load(usersSavedFilePath)
users = users.map(User.create)

let currentUser = users[0]

while(running) {
    const command = readline.question('Enter command: ')
    processCommand(command)
}

function processCommand(command) {
    if (command === 'exit') {
        console.log('Bye!')
        running = false
    }
    else if (command === 'register') {
        if (currentUser === null) {
            registerUser()
        }
        else {
            console.log('You are already logged in. Please logout to use this function.')
        }
    }
    else if (command === 'login') {
        login()
    }
    else if (command === 'logout') {
        logout()
    }
    else {
        console.log('Sorry, I do not know this command!')
    }
}

function registerUser() {
    const username = readUniqueUsername()
    const firstname = readline.question('First name: ')
    const lastname = readline.question('Last name: ')
    const age = readline.questionInt('Age: ')
    const gender = readline.question('Gender: ')
    const location = getLocation()
    const password = bcrypt.hashSync(readline.questionNewPassword('Password: '), bcryptSaltRounds)
    const email = readline.questionEMail('Email: ')
    
    const user = new User(username, firstname, lastname, age, gender, location, password, email)
    users.push(user)
    currentUser = user
    Database.save(users, usersSavedFilePath)

    console.log('Welcome', user.salutationName, ', you are now registered and already logged in! Have fun :)')
}

function readUniqueUsername() {
    let username = null
    while (username === null) {
        let input = readline.question('Username: ')
        input = input.toLowerCase()
        if (users.map(u => u.username).includes(input)) {
            console.log('This username is already taken. Please choose another one!')
        }
        else if (input === '') {
            console.log('Username cannot be empty. Please choose another one!')
        }
        else {
            username = input
        }
    }
    return username
}

function getLocation() {
    while (true) {
        const input = readline.question('Do you want to add your location to your profile? (y/yes/n/no) ')
        if (['y', 'yes'].includes(input)) {
            const latitude = readline.questionFloat('Location - Latitude (y): ')
            const longitude = readline.questionFloat('Location - Longitude (x): ')
            const label = readline.question('Location - Label (optional): ')
            return new Location(latitude, longitude, label)
        }
        else if (['n', 'no'].includes(input)) {
            return null
        }
        else {
            console.log('Please enter \'y\' or \'yes\' or \'n\' or \'no\'')
        }
    }
}

function login() {
    if (currentUser === null) {
        let error = false

        const username = readline.question('Username: ')
        const password = readline.question('Password: ', { hideEchoBack: true })
        const existingUserList = users.filter(u => u.username === username)
        if (existingUserList.length === 1) {
            const existingUser = existingUserList[0]
            if (bcrypt.compareSync(password, existingUser.password)) {
                currentUser = existingUser
                console.log('Welcome', currentUser.salutationName, ', you successfully logged in!')
            }
            else {
                error = true
            }
        }
        else {
            error = true
        }

        if (error === true) {
            console.error('Username and/or password invalid!')
        }
    }
    else {
        console.error('You are already logged in as user\'', currentUser.username, '\'')
    }
}

function logout() {
    if (currentUser !== null) {
        console.log('Bye', currentUser.salutationName + '!', 'You successfully logged out!')
        currentUser = null
    }
    else {
        console.error('No user is logged in. Therefore you cannot logout. ;)')
    }
}
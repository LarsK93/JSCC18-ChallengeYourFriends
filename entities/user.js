module.exports = class User {
    constructor(username, firstname, lastname, age, gender, location, password, email) {
        this.username = username
        this.firstname = firstname
        this.lastname = lastname
        this.age = age
        this.gender = gender
        this.location = location
        this.password = password
        this.email = email
        
        this.bookmarkedChallenges = []
        this.friendlist = []
        this.receivedFriendRequests = []
        this.sentFriendRequests = []

        if([null, ''].includes(this.firstname)) {
            this.salutationName = this.username
        }
        else {
            this.salutationName = this.firstname
        }
    }

    static create({ username, firstname, lastname, age, gender, location, password, email }) {
        return new User(username, firstname, lastname, age, gender, location, password, email)
    }

    sendFriendRequest(user) {
        if (!this.sentFriendRequests.includes(user.username) 
                && !this.receivedFriendRequests.includes(user.username)) {
            this.sentFriendRequests.push(user.username)
            user.receivedFriendRequests.push(this.username)
        }
        else {
            console.error('User', this.username, 'cannot send a friend request to user', 
                user.username, '. There is an open friend request already.')
        }
    }

    confirmFriendRequest(user) {
        if (this.receivedFriendRequests.includes(user.username)) {
            this.friendlist.push(user)
            user.friendlist.push(this)
            this.receivedFriendRequests = this.receivedFriendRequests.filter(el => el !== user)
            user.sentFriendRequests = user.sentFriendRequests.filter(el => el !== this)
        }
        else {
            console.error('Cannot confirm friend request. User', this.username, 
                'has not received a friend request from user', user.username + '.')
        }
    }

    discardFriendRequest(user) {
        if (this.receivedFriendRequests.includes(user.username)) {
            this.receivedFriendRequests = this.receivedFriendRequests.filter(el => el !== user)
            user.sentFriendRequests = user.sentFriendRequests.filter(el => el !== this)
        }
        else {
            console.error('Cannot confirm friend request. User', this.username, 
                'has not received a friend request from user', user.username + '.')
        }
    }
}
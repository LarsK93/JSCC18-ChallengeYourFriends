module.exports = class ChoiceElement {
    constructor(value) {
        this.value = value
        this.users = [] // users who chose this element
    }

    addUserChose(user) {
        this.users.push(user)
    }
}
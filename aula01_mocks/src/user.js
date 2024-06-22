class User {
    constructor({ id, name, professional, age }) {
        this.id = parseInt(id)
        this.name = name
        this.professional = professional
        this.birthday = new Date().getFullYear() - parseInt(age)
    }
}

module.exports = User;
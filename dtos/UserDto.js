module.exports = class UserDto {
    id;
    login;
    email;


    constructor(model) {
        this.id = model.id;
        this.login = model.login;
        this.email = model.email;
    }
}
const User = require('../models/User');
const Tokens = require('../models/Tokens');


class AuthService {
     async registration(login, password, email) {
        try {
            const user = await User.create({ login: login, password: password, email: email});
            return user;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
}

module.exports = new AuthService();
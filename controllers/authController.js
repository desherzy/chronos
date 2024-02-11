const authService = require("../services/authService");


class AuthController { 
    async registration(req, res, next) {
        try {
            const {login, password, email} = req.body;
            const userData = await authService.registration(login, password, email);
            return res.json(userData);
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new AuthController();
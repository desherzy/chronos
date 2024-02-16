const User = require('../models/User');
const UserDto = require('../dtos/UserDto');
const Invitation = require('../models/Invitation');
const ApiError = require('../exceptions/apiError');
const bcrypt = require('bcrypt');
const UserCalendar = require('../models/UserCalendar');
const UserEvent = require('../models/UserEvent');
const Links = require('../models/Links');
const Tokens = require('../models/Tokens');

class UserService {
    
    async getUsers() {
        try {
          const users = await User.findAll();
          if (users) {
            const userDtos = users.map(user => new UserDto(user));
            console.log(userDtos);
            return userDtos;
          } else {
            console.log('Users not found');
            throw ApiError.notFound('Users not found'); 
          }
        } catch (error) {
          console.error('Error getting users:', error);
          throw error;
        }
        
    }

    async getUser(id) {
        try {
          const user = await User.findOne({where: {id: id}});
          if (user != undefined) {
            const userDto = new UserDto(user, 1); // where we get session_id?
            return userDto;
          } else {
            console.log('User not found');
            throw ApiError.badRequest('User not found'); 
          }
        } catch (error) {
          console.error('Error getting user:', error);
          throw error;
        }
    }

    async updateUser(id, updatedFields) {
        try {
          const user = await User.findOne({where: {id: id}});
          if (!user) {
            console.log('User not found');
            throw ApiError.badRequest('User not found'); 
          }

          if (updatedFields.login) {
            user.login = updatedFields.login;
          }
          if (updatedFields.email) {
            user.email = updatedFields.email;
            // need to confirm email?
          }

          const userDto = new UserDto(user);
          return userDto;
        } catch (error) {
          console.error('Error updating user:', error);
          throw error;
        }
    }

    async deleteUser(id) { 
       // firstly delete all records with this userId from db (invitation, userCalendar, userEvent, links, tokens tables)
       // and then delete user from user table

      try {
        const user = await User.findAll({where: {id: id}});
        if (!user) {
          throw ApiError.badRequest('User exists');
        } else {
          const inviter = await Invitation.destroy({where: {inviter_user_id: id}});
          const invited = await Invitation.destroy({where: {invited_user_id: id}});
          
          const userCalendar = await UserCalendar.destroy({where: {user_id: id}});
          const userEvent = await UserEvent.destroy({where: {user_id: id}});
          
          const links = await Links.destroy({where: {user_id: id}});
          const tokens = await Tokens.destroy({where: {user_id: id}});
          
          user = await User.destroy({where: {id: id}});
          console.log('User[' + id + '] deleted');
        }
      } catch (error) {
        console.error('Error deliting user:', error);
        throw error;
      }
    }

    async uploadUserPhoto(id, photoPath) { //just save photoPath variable to database (user.profile_image field in db)
        try {
          const user = await User.findOne({where: {id: id}});
          if (!user) {
            console.log('User not found');
            throw ApiError.badRequest('User not found'); 
          }
          if (photoPath) {
            user.profileImage = photoPath;
          }
          const userDto = new UserDto(user);
          return userDto;
        } catch (error) {
          console.error('Error uploading user photo:', error);
          throw error;
        }
    }

    async deleteUserPhoto(id) { //the same as above, but set profile_image to null;
        try {
          const user = await User.findOne({where: {id: id}});
          if (!user) {
            console.log('User not found');
            throw ApiError.badRequest('User not found'); 
          } else {
            user.profileImage = null;
            const userDto = new UserDto(user);
            return userDto;
          }
        } catch (error) {
          console.error('Error deliting user:', error);
          throw error;
        }
    }

    async changePass(id, passwords) { // ???
       //return nothing, passwords object contain newPassword and oldPassword, so we need to check if passwords.oldPassword is right password, if yes save passwords.newPassword
       //before checking we need to hash old and compare to the hash from db (password field)
       //const hashNewPassword = await bcrypt.hash(passwords.newPassword, 3); hash new and then save
      try {
        const user = await User.findOne({where: {id: id}});
        if (!user) {
          console.log('User not found');
          throw ApiError.badRequest('User not found'); 
        }

        let hashedOldPassword = await bcrypt.hash(passwords.oldPassword, 3);

        if (user.password != hashedOldPassword) {
          console.log('Passwords not matched');
          throw ApiError.badRequest('Passwords not matched');
        } else {
          let hashedNewPassword = await bcrypt.hash(passwords.newPassword, 3);
          user.password = hashedNewPassword;
        }
      } catch (error) {
        console.error('Error updating user:', error);
        throw error;
      }
    }
}

module.exports = new UserService();
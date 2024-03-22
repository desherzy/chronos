const User = require('../models/User');
const UserDto = require('../dtos/UserDto');
const Invitation = require('../models/Invitation');
const ApiError = require('../exceptions/apiError');
const bcrypt = require('bcrypt');
const UserCalendar = require('../models/UserCalendar');
const UserEvent = require('../models/UserEvent');
const Links = require('../models/Links');
const Tokens = require('../models/Tokens');
const Permission = require('../models/Permission');

class UserService {
    
    async getUsers() {
        try {
          const users = await User.findAll();
          if (users) {
            const userDtos = users.map(user => new UserDto(user));
            return userDtos;
          } else {
            throw ApiError.notFound('Users not found'); 
          }
        } catch (error) {
          throw error;
        }
        
    }

    async getUser(id) {
        try {
          const user = await User.findOne({where: {id: id}});
          if (!user) {
            const userDto = new UserDto(user);
            return userDto;
          } else {
            throw ApiError.badRequest('User not found'); 
          }
        } catch (error) {
          throw error;
        }
    }

    async getCalendarUsers(calendarId) {
      try {
        const users = await UserCalendar.findAll({
          where: { calendar_id: calendarId },
          include: [
            {
              model: User,
              attributes: ['id', 'login', 'profile_image'],
            },
            {
              model: Permission,
              attributes: ['id', 'name'],
            },
          ],
        });
    
        const participants = users.map((userCalendar) => {
          const user = userCalendar.User;
          const permission = userCalendar.Permission;
    
          return {
            id: user.id,
            login: user.login,
            permission: permission.name,
            profileImage: user.profile_image,
          };
        });
    
        return participants;
      } catch (error) {
        throw error;
      }
    }

    async updateUser(id, updatedFields) {
        try {
          const user = await User.findOne({where: {id: id}});
          if (!user) {
            throw ApiError.badRequest('User not found'); 
          }

          if (updatedFields.login) {
            user.login = updatedFields.login;
          }
          if (updatedFields.email) {
            user.email = updatedFields.email;
          }

          await user.save();

          const userDto = new UserDto(user);
          return userDto;
        } catch (error) {
          throw error;
        }
    }

    async deleteUser(id) { 
      try {
        const user = await User.findAll({where: {id: id}});
        if (!user) {
          throw ApiError.badRequest('User exists');
        } else {
          await Invitation.destroy({where: {inviter_user_id: id}});
          await Invitation.destroy({where: {invited_user_id: id}});
          
          await UserCalendar.destroy({where: {user_id: id}});
          await UserEvent.destroy({where: {user_id: id}});
          
          await Links.destroy({where: {user_id: id}});
          await Tokens.destroy({where: {user_id: id}});
          
          await User.destroy({where: {id: id}});
          console.log('User[' + id + '] deleted');
        }
      } catch (error) {
        console.error('Error deliting user:', error);
        throw error;
      }
    }

    async uploadUserPhoto(id, photoPath) {
        try {
          const user = await User.findOne({where: {id: id}});

          if (!user) {
            throw ApiError.badRequest('User not found'); 
          }
          if (photoPath) {
            user.profileImage = photoPath;
          }

          await user.save();
          const userDto = new UserDto(user);

          return userDto;
        } catch (error) {
          throw error;
        }
    }

    async deleteUserPhoto(id) {
        try {
          const user = await User.findOne({where: {id: id}});
          if (!user) {
            throw ApiError.badRequest('User not found'); 
          } else {
            user.profileImage = null;
            await user.save();
            const userDto = new UserDto(user);
            return userDto;
          }
        } catch (error) {
          throw error;
        }
    }

    async changePass(id, passwords) {
      try {
        const user = await User.findOne({where: {id: id}});
        
        if (!user) {
          throw ApiError.badRequest('User not found'); 
        }

        let hashedOldPassword = await bcrypt.hash(passwords.oldPassword, 3);

        if (user.password != hashedOldPassword) {
          throw ApiError.badRequest('Passwords not matched');
        } else {
          let hashedNewPassword = await bcrypt.hash(passwords.newPassword, 3);
          user.password = hashedNewPassword;
          await user.save();
        }
      } catch (error) {
        throw error;
      }
    }
}

module.exports = new UserService();
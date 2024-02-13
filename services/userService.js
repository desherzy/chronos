

class UserService {
    
    async getUsers() {
     //   const users = find all users from db
     /*   const userDTOs = users.map(user => new UserDto(user));
          return userDTOs; */
    }

    async getUser(id) {
        //get user
       /* const userDto = new UserDto(user);
        return userDto; */
    }


    async updateUser(id, updatedFields) {
      //find user. const user = ...
    /*    if (!user) {
            throw ApiError.badRequest('User is not found');
        }
        if (updatedFields.login) {
            user.login = updatedFields.login;
        }
        if (updatedFields.email) {
            user.email = updatedFields.email;
        }
        then save and throw updated user model to DTO
        const userDto = new UserDto(updatedUser);
        return userDto; */
    }

    async deleteUser(id) {
       // firstly delete all records with this userId from db (invitation, userCalendar, userEvent, links, tokens tables)
       // and then delete user from user table
    }

    async uploadUserPhoto(id, photoPath) { //just save photoPath variable to database (user.profile_image field in db)
      //  const user = find by id

      /*  if (!user) {
            throw ApiError.badRequest('User is not found');
        } */
      /* user.profile_image = photoPath; 
      then save user and throw to DTO
        const userDto = new UserDto(updatedUser);

        return userDto; */
    }

    async deleteUserPhoto(id) { //the same as above, but set profile_image to null;
 //  const user = find by id

      /*  if (!user) {
            throw ApiError.badRequest('User is not found');
        } */
      /* user.profile_image = null; 
      then save user and throw to DTO
        const userDto = new UserDto(updatedUser);

        return userDto; */
    }

    async changePass(id, passwords) {
       //return nothing, passwords object contain newPassword and oldPassword, so we need to check if passwords.oldPassword is right password, if yes save passwords.newPassword
       //before checking we need to hash old and compare to the hash from db (password field)
       //const hashNewPassword = await bcrypt.hash(passwords.newPassword, 3); hash new and then save

    }

}

module.exports = new UserService();
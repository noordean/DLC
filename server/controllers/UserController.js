import UserService from '../services/UserService';

/**
 * @description: controls all user endpoints
 * 
 * @class UserController
 */
class UserController {

/**
 * @description: controls the signup route: POST: api/vi/user/signup
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Object} response containing request status
 */
  static signUp(req, res) {
    const { username, email, password, phoneNumber } = req.body;
    UserService.signUp(username, email, password, phoneNumber)
    .then((user) => {
     if (typeof user === 'string' && user.match('^auth') !== null) {
        const errorMessage = user.slice(user.indexOf('/') + 1).replace(/-/g, ' ');
        return res.status(401).json({ message: errorMessage });
      }
      if (!(user instanceof Object && !Array.isArray(user))) {
        return res.status(500).json({ message: 'Unexpected error occurred' });
      }
      res.status(201).json({ message: user });
    });
  }

/**
 * @description: controls the signin route: POST: api/vi/user/signin
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Object} response containing request status
 */
  static signIn(req, res) {
    const { email, password } = req.body;
    UserService.signIn(email, password)
    .then((user) => {
      if (user.match('^auth') !== null) {
        const errorMessage = user.slice(user.indexOf('/') + 1).replace(/-/g, ' ');
        return res.status(401).json({ message: errorMessage });
      }
      res.status(200).json({ message: 'Login successful' });
    })
  }
}

export default UserController;
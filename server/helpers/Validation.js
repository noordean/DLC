

/**
 * @description: Middleware class that validates req.body
 * 
 * @class Validation
 */
class Validation {

/**
 * @description: checks the signUp parameters
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 * 
 * @return {Object} response containing the validation status
 */
  static checkSignUp(req, res, next) {
    const { username, email, password, phoneNumber } = req.body;
    const parameters = { username, email, password, phoneNumber };
    const undefinedErrors = [];
    const emptyErrors = [];
    const reqBodyKeys = Object.keys(req.body);
    Object.keys(parameters).forEach((params) => {
      if (reqBodyKeys.indexOf(params) === -1) {
        undefinedErrors.push(params);
      } else if (req.body[params].trim().length === 0) {
        emptyErrors.push(params);
      }
    });
    if (undefinedErrors.length > 0) {
      return res.status(400).json(
        { message: `${undefinedErrors[0]} must be supplied` });
    } else if (emptyErrors.length > 0) {
      return res.status(400).json(
        { message: `${emptyErrors[0]} cannot be empty` });
    } else if (/^[a-zA-Z]+$/.test(username) === false) {
      return res.status(400).json({
        message: 'Username should contain only letters' });
    } else if (/^[a-zA-Z]{5,12}$/.test(username) === false) {
      return res.status(400).json({
        message: 'Username must be between 5-12 characters' });
    } else if (/^[0-9]{11}$/.test(phoneNumber) === false) {
      return res.status(400).json({
        message: 'Kindly provide a valid Phone-number' });
    } else if (/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{5,12}$/.test(password) === false) {
      return res.status(400).json({
        message:
        'Password must be alphanumeric and should contain 5-12 characters' });
    }
    return next();
  }

/**
 * @description: checks the signIn parameters
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 * 
 * @return {Object} response containing the validation status
 */
  static checkSignIn(req, res, next) {
    const { email, password } = req.body;
    const parameters = { email, password };
    const undefinedErrors = [];
    const reqBodyKeys = Object.keys(req.body);
    Object.keys(parameters).forEach((params) => {
      if (reqBodyKeys.indexOf(params) === -1) {
        undefinedErrors.push(params);
      }
    });
    if (undefinedErrors.length > 0) {
      return res.status(400).json(
        { message: `${undefinedErrors[0]} must be supplied` });
    }
    return next();
  }
}

export default Validation;
import { firebase, usersRef } from '../config';

/**
 * @description: interacts with database directly and serve the controller
 * 
 * @class UserService
 */
class UserService {

/**
 * @description: save user's information
 * 
 * @param {String} username user's username
 * @param {String} email user's email
 * @param {String} password user's password
 * @param {String} phoneNumber user's phone-number
 * 
 * @return {Object} response containing saved data
 */
  static signUp(username, email, password, phoneNumber) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      return firebase.database().ref(`users/${user.uid}`).set({
        username,
        email,
        phoneNumber
        }).then(() => {
          return usersRef.limitToLast(1).orderByKey().once('value', (snapshot) => {
            return snapshot.val();
          });
        })
      }).catch((error) => {
        return (error.code);
    });
  }

/**
 * @description: signs users in
 * 
 * @param {String} email user's email
 * @param {String} password user's password
 * 
 * @return {Object} response containing user's status
 */
  static signIn(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      return user.uid;
    })
    .catch((error) => {
      return error.code;
    });
  }
}

export default UserService;

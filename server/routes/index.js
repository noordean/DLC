import express from 'express';

import UserController from '../controllers/UserController';
import Validation from '../helpers/Validation';

const user = express.Router();

user.post('/api/v1/user/signup', Validation.checkSignUp, UserController.signUp);
user.post('/api/v1/user/signin', UserController.signIn);

export default user;

import express from 'express';
import bodyParser from 'body-parser';

import router from './routes';
import { firebase, firebaseAuth, usersRef } from './config';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log('App running...');
});

app.use('/', router);
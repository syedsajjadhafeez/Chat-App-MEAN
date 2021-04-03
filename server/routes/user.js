import express from 'express';
// controllers
import user from '../controllers/user.js';
const router = express.Router();
import { encode } from '../middlewares/jwt.js';
router
  .get('/', user.onGetAllUsers)
  .post('/', user.onCreateUser)
  .get('/:id', user.onGetUserById)
  .delete('/:id', user.onDeleteUserById)
  .post('/login',encode, user.onLoginUser)

export default router;

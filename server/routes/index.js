import express from 'express';
// middlewares
import { encode } from '../middlewares/jwt.js';
import UserModel from '../models/User.js';

const router = express.Router();

router
  .post('/login', encode, async (req, res, next) => {

    try {
      const user = await UserModel.loginUser(req.params.username);
      return res.status(200).json({ success: true, user,  authorization: req.authToken });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  });

export default router;
